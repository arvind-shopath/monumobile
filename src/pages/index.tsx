import React, { useState } from 'react';
import Head from 'next/head';
import { useApp } from '@/context/AppContext';
import { TopBar } from '@/components/public/TopBar';
import { Navbar } from '@/components/public/Navbar';
import { Hero } from '@/components/public/Hero';
import { Services } from '@/components/public/Services';
import { PriceEstimator } from '@/components/public/PriceEstimator';
import { LiveTracker } from '@/components/public/LiveTracker';
import { BranchCards } from '@/components/public/BranchCards';
import { LoginModal } from '@/components/public/LoginModal';
import { Footer } from '@/components/public/Footer';

import { PortalHeader } from '@/components/portal/PortalHeader';
import { PortalSidebar } from '@/components/portal/PortalSidebar';
import { DashboardTab } from '@/components/portal/tabs/DashboardTab';
import { PosTab } from '@/components/portal/tabs/PosTab';
import { JobsTab } from '@/components/portal/tabs/JobsTab';
import { InventoryTab } from '@/components/portal/tabs/InventoryTab';
import { DirectoryTab } from '@/components/portal/tabs/DirectoryTab';
import { SalesTab } from '@/components/portal/tabs/SalesTab';
import { KhataTab } from '@/components/portal/tabs/KhataTab';
import { ExpensesTab } from '@/components/portal/tabs/ExpensesTab';
import { BalanceTab } from '@/components/portal/tabs/BalanceTab';
import { AttendanceTab } from '@/components/portal/tabs/AttendanceTab';
import { StaffTab } from '@/components/portal/tabs/StaffTab';
import { SettingsTab } from '@/components/portal/tabs/SettingsTab';

export default function Home() {
  const { currentView, activeTab } = useApp();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Render Portal Active Tab
  const renderPortalTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'pos':
        return <PosTab />;
      case 'jobs':
        return <JobsTab />;
      case 'inventory':
        return <InventoryTab />;
      case 'directory':
        return <DirectoryTab />;
      case 'sales':
        return <SalesTab />;
      case 'khata':
        return <KhataTab />;
      case 'expenses':
        return <ExpensesTab />;
      case 'balance':
        return <BalanceTab />;
      case 'attendance':
        return <AttendanceTab />;
      case 'staff':
        return <StaffTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <>
      <Head>
        <title>Monu Mobile Solution | एक्सप्रेस स्मार्टफोन रिपेयरिंग लैब & ERP</title>
        <meta name="description" content="Express Smartphone Repair Lab - iPhone, Samsung, OnePlus Screen, Battery, IC Repair in Lucknow & Kannauj" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo-badge.svg" />
      </Head>

      {currentView === 'public' ? (
        <div className="min-h-screen flex flex-col bg-white text-slate-800">
          <TopBar />
          <Navbar onOpenLogin={() => setIsLoginOpen(true)} />
          <main className="flex-1">
            <Hero />
            <Services />
            <PriceEstimator />
            <LiveTracker />
            <BranchCards />
          </main>
          <Footer />
          <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </div>
      ) : (
        <div className="min-h-screen flex bg-slate-100 text-slate-800">
          <PortalSidebar />
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            <PortalHeader />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
              <div className="max-w-7xl mx-auto">
                {renderPortalTab()}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}
