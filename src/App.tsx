/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ActiveScreen, ScreeningCase } from './types';
import { INITIAL_CASES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CommandCenter } from './components/CommandCenter';
import { ExplainableRisk } from './components/ExplainableRisk';
import { NewScreening } from './components/NewScreening';
import { HistoryLog } from './components/HistoryLog';
import { AlertsModal } from './components/AlertsModal';
import { StationModal } from './components/StationModal';

export default function App() {
  // Screen 1: Command Center is the Initial Screen as specified in Prototype Navigation Spec
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('command');
  const [cases, setCases] = useState<ScreeningCase[]>(INITIAL_CASES);
  const [currentCase, setCurrentCase] = useState<ScreeningCase>(INITIAL_CASES[0]);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isStationModalOpen, setIsStationModalOpen] = useState(false);

  const handleSelectCase = (caseItem: ScreeningCase) => {
    setCurrentCase(caseItem);
  };

  const handleCaseUpdate = (updatedCase: ScreeningCase) => {
    setCases((prev) =>
      prev.map((c) => (c.id === updatedCase.id ? updatedCase : c))
    );
    setCurrentCase(updatedCase);
  };

  const handleSelectAlertCase = (caseId: string) => {
    const found = cases.find((c) => c.id === caseId);
    if (found) {
      setCurrentCase(found);
      setActiveScreen('explainable-risk');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-[#E0E0E0] flex flex-col font-sans selection:bg-[#E0E0E0] selection:text-[#0A0A0B]">
      {/* Fixed Tactical Header */}
      <Header
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        alertCount={3}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-28 pb-16 flex flex-col items-center">
        {activeScreen === 'command' && (
          <CommandCenter
            cases={cases}
            onSelectCase={handleSelectCase}
            onNavigate={setActiveScreen}
            onInitiateStation={() => setIsStationModalOpen(true)}
          />
        )}

        {activeScreen === 'explainable-risk' && (
          <ExplainableRisk
            currentCase={currentCase}
            onNavigate={setActiveScreen}
            onCaseUpdate={handleCaseUpdate}
          />
        )}

        {activeScreen === 'new-screening' && (
          <NewScreening
            cases={cases}
            onNavigate={setActiveScreen}
            onSelectCase={handleSelectCase}
          />
        )}

        {activeScreen === 'history' && (
          <HistoryLog
            cases={cases}
            onSelectCase={handleSelectCase}
            onNavigate={setActiveScreen}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Bar */}
      <BottomNav
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        onOpenAlerts={() => setIsAlertsOpen(true)}
        alertCount={3}
      />

      {/* Interactive Alerts Drawer/Modal */}
      <AlertsModal
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        onSelectAlertCase={handleSelectAlertCase}
      />

      {/* Station Initiator Modal */}
      <StationModal
        isOpen={isStationModalOpen}
        onClose={() => setIsStationModalOpen(false)}
        onNavigate={setActiveScreen}
      />
    </div>
  );
}
