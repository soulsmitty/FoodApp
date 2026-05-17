'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { ScanLine } from 'lucide-react';
import { useScanStore } from '@/store/useScanStore';
import { ScanResult } from '@/components/scanner/ScanResult';

// Camera must load client-side only
const CameraScanner = dynamic(
  () => import('@/components/scanner/CameraScanner').then((m) => m.CameraScanner),
  { ssr: false, loading: () => <div className="aspect-video rounded-2xl bg-brand-surface animate-pulse" /> },
);

export default function ScannerPage() {
  const { currentScan, clearScan } = useScanStore();
  const [showResult, setShowResult] = useState(false);

  function handleScanComplete() {
    setShowResult(true);
  }

  function handleClose() {
    setShowResult(false);
    clearScan();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <ScanLine className="w-6 h-6 text-brand-gold" /> Food Scanner
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          Point camera at any food for instant AI identification, health grading, and storage hacks.
        </p>
      </div>

      <CameraScanner onScanComplete={handleScanComplete} />

      {showResult && currentScan && (
        <ScanResult result={currentScan} onClose={handleClose} />
      )}
    </div>
  );
}
