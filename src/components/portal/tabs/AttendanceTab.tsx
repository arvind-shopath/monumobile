import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '@/context/AppContext';

function calculateDistanceMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // metres
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
            Math.cos(phi1) * Math.cos(phi2) *
            Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export const AttendanceTab: React.FC = () => {
  const { currentUser, branches, attendance, addAttendance, isOwner } = useApp();

  const [selectedBranchId, setSelectedBranchId] = useState<string>(
    currentUser?.branchId && currentUser.branchId !== 'all' ? currentUser.branchId : 'branch_hazratganj'
  );
  const [coords, setCoords] = useState<{ lat: number; lng: number; accuracy: number } | null>(null);
  const [gpsError, setGpsError] = useState<string>('');
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [punchType, setPunchType] = useState<'in' | 'out'>('in');
  const [notes, setNotes] = useState<string>('');

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const selectedBranch = branches.find(b => b.id === selectedBranchId) || branches[0];

  // Request GPS Location
  const requestGPS = () => {
    setGpsLoading(true);
    setGpsError('');
    if (!navigator.geolocation) {
      setGpsError('ब्राउज़र में GPS सपोर्ट नहीं है।');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy
        });
        setGpsLoading(false);
      },
      (err) => {
        setGpsError(`GPS सिग्नल नहीं मिला: ${err.message || 'लोकेशन अस्वीकृत'}`);
        setGpsLoading(false);
        setCoords(null);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    requestGPS();
    return () => {
      stopCamera();
    };
  }, []);

  const distanceMeters = coords 
    ? Math.round(calculateDistanceMeters(coords.lat, coords.lng, selectedBranch.lat, selectedBranch.lng)) 
    : 999999;

  const isWithinRadius = distanceMeters <= (selectedBranch.radiusMeters || 10);
  const distFormatted = distanceMeters >= 1000 ? (distanceMeters / 1000).toFixed(1) + ' km' : distanceMeters + 'm';

  const startCamera = async () => {
    if (!coords || !isWithinRadius) {
      alert(`🚫 सुरक्षा नियम: आप दुकान से ${distFormatted} दूर हैं (अनुमति दायरा: 10 मीटर)। दुकान के अंदर पहुंचे बिना कैमरा चालू नहीं होगा।`);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } }
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (e) {
      alert('कैमरा परमिशन नहीं मिली। कृपया ब्राउज़र सेटिंग्स में कैमरा Allow करें।');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !coords) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Inscribe permanent GPS watermark
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
    ctx.fillRect(0, canvas.height - 52, canvas.width, 52);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    ctx.fillText(`📍 ${coords.lat.toFixed(5)}°N, ${coords.lng.toFixed(5)}°E | ${selectedBranch.shortName} (${distanceMeters}m दूरी)`, 12, canvas.height - 30);

    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`📅 ${dateStr} ${timeStr} | Monu Mobile Solution GPS Verified`, 12, canvas.height - 12);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedPhoto(dataUrl);
    stopCamera();
  };

  const handleSubmitPunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coords) {
      alert('🚫 GPS लोकेशन आवश्यक है!');
      return;
    }
    if (!isWithinRadius) {
      alert(`🚫 सुरक्षा नियम: आप दुकान से ${distFormatted} दूर हैं। हाजिरी दर्ज नहीं हो सकती।`);
      return;
    }
    if (!capturedPhoto) {
      alert('🚫 लाइव कैमरा सेल्फी अनिवार्य है!');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    addAttendance({
      empId: currentUser?.id || 'emp_guest',
      empName: currentUser?.name || 'स्टाफ',
      branchId: selectedBranch.id,
      branchName: selectedBranch.name,
      date: dateStr,
      inTime: punchType === 'in' ? timeStr : '—',
      outTime: punchType === 'out' ? timeStr : '—',
      hours: 0,
      photo: capturedPhoto,
      coords,
      distanceMeters,
      verified: true,
      notes
    });

    alert('✅ आपकी हाजिरी (GPS व लाइव सेल्फी) सफलतापूर्वक दर्ज हो गई!');
    setCapturedPhoto(null);
    setNotes('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      <div>
        <h2 className="text-xl font-black text-slate-900">📸 लाइव सेल्फी व GPS अटेंडेंस</h2>
        <p className="text-xs text-slate-500 mt-0.5">10 मीटर के दायरे में मौके पर ली गई लाइव सेल्फी से ऑटो-वेरिफाइड हाजिरी</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Attendance Punch Box */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          
          <form onSubmit={handleSubmitPunch} className="space-y-4 text-xs">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">शाखा (Branch) *</label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
                >
                  {branches.map(b => (
                    <option key={b.id} value={b.id}>📍 {b.shortName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">पंच प्रकार *</label>
                <select
                  value={punchType}
                  onChange={(e) => setPunchType(e.target.value as 'in' | 'out')}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-800 outline-none"
                >
                  <option value="in">☀️ सुबह का इन-टाइम (Punch In)</option>
                  <option value="out">🌙 शाम का आउट-टाइम (Punch Out)</option>
                </select>
              </div>
            </div>

            {/* GPS Geofence Status Banner */}
            {coords && (
              <div className={`p-3 rounded-xl border text-xs text-center font-bold ${
                isWithinRadius ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-rose-50 border-rose-300 text-rose-800'
              }`}>
                {isWithinRadius ? (
                  <span>🟢 लोकेशन सत्यापित: आप दुकान के अंदर हैं ({distFormatted})</span>
                ) : (
                  <span>🚫 स्थान सत्यापन विफल: आप दुकान से {distFormatted} दूर हैं (अनुमति दायरा: 10 मीटर)</span>
                )}
              </div>
            )}

            {gpsError && (
              <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 rounded-xl text-xs font-bold text-center">
                ⚠️ {gpsError}
              </div>
            )}

            {/* Camera View Area */}
            <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1.5 text-xs text-slate-200">
                  <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                  लाइव कैमरा सेल्फी (गैलरी फोटो पूर्णतः प्रतिबंधित)
                </span>
                {!cameraActive && !capturedPhoto && (
                  <button
                    type="button"
                    onClick={startCamera}
                    disabled={!isWithinRadius}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 underline disabled:opacity-50"
                  >
                    कैमरा चालू करें
                  </button>
                )}
              </div>

              <div className="relative w-full h-56 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-center border border-slate-800">
                <video ref={videoRef} playsInline autoPlay className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`} />
                <canvas ref={canvasRef} className="hidden" />
                {capturedPhoto && (
                  <img src={capturedPhoto} alt="Captured Selfie" className="w-full h-full object-cover" />
                )}
                {!cameraActive && !capturedPhoto && (
                  <div className="text-center p-4 text-slate-400 text-xs">
                    {isWithinRadius ? (
                      <span>🟢 GPS सत्यापित। ऊपर दिए गए बटन से कैमरा चालू करें और सेल्फी लें।</span>
                    ) : (
                      <span className="text-rose-400 font-bold">🚫 गलत स्थान से सेल्फी लेना ब्लॉक है। दुकान के 10 मीटर दायरे में आने पर ही कैमरा खुलेगा।</span>
                    )}
                  </div>
                )}
              </div>

              {cameraActive && (
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md transition"
                >
                  📸 सेल्फी कैप्चर करें
                </button>
              )}
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">रिमार्क्स / नोट</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="उदा. समय पर पहुंचे, मुख्य लैब ड्यूटी शुरू"
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!capturedPhoto || !isWithinRadius}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-400 text-white rounded-xl text-xs sm:text-sm font-black shadow-md transition disabled:cursor-not-allowed"
            >
              ✅ हाजिरी दर्ज करें (Punch Attendance)
            </button>

          </form>

        </div>

        {/* Attendance History */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-black text-slate-800">आज का हाजिरी रिकॉर्ड</h3>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {attendance.length === 0 ? (
              <p className="text-slate-400 text-xs text-center py-8">आज कोई हाजिरी रिकॉर्ड नहीं है।</p>
            ) : (
              attendance.map(a => (
                <div key={a.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-900">
                    <span>{a.empName}</span>
                    <span className="text-emerald-700">🟢 सत्यापित</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {a.photo && (
                      <img src={a.photo} alt="Punch" className="w-12 h-12 rounded-lg object-cover border border-slate-300" />
                    )}
                    <div className="text-[11px] text-slate-600">
                      <p>शाखा: {a.branchName}</p>
                      <p>समय: {a.inTime}</p>
                      <p className="text-[10px] text-slate-400 font-mono">दूरी: {a.distanceMeters}m</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
