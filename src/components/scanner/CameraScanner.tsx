'use client';
import { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Camera, Barcode, Loader2, AlertCircle, SwitchCamera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScanStore } from '@/store/useScanStore';

interface Props {
  onScanComplete: () => void;
}

export function CameraScanner({ onScanComplete }: Props) {
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [error, setError] = useState<string | null>(null);
  const [barcodeInput, setBarcodeInput] = useState('');

  const { isScanning, scanMode, setScan, setScanning, setScanMode } = useScanStore();

  const handleCapture = useCallback(async () => {
    if (!webcamRef.current) return;
    setError(null);
    setScanning(true);

    try {
      const imageSrc = webcamRef.current.getScreenshot({ width: 1280, height: 720 });
      if (!imageSrc) throw new Error('Could not capture image');

      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageSrc }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Scan failed');
      }

      const data = await res.json();
      setScan({ ...data, imagePreview: imageSrc });
      onScanComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Scan failed');
    } finally {
      setScanning(false);
    }
  }, [setScan, setScanning, onScanComplete]);

  const handleBarcodeScan = useCallback(async () => {
    if (!barcodeInput.trim()) return;
    setError(null);
    setScanning(true);

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barcode: barcodeInput.trim() }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? 'Product not found');
      }

      const data = await res.json();
      setScan(data);
      onScanComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Barcode lookup failed');
    } finally {
      setScanning(false);
    }
  }, [barcodeInput, setScan, setScanning, onScanComplete]);

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex gap-2 p-1 bg-brand-surface rounded-xl">
        <button
          onClick={() => setScanMode('vision')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            scanMode === 'vision'
              ? 'bg-brand-card text-brand-gold shadow'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Camera className="w-4 h-4" /> AI Vision
        </button>
        <button
          onClick={() => setScanMode('barcode')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            scanMode === 'barcode'
              ? 'bg-brand-card text-brand-gold shadow'
              : 'text-zinc-500 hover:text-zinc-300'
          }`}
        >
          <Barcode className="w-4 h-4" /> Barcode
        </button>
      </div>

      {scanMode === 'vision' && (
        <div className="space-y-3">
          {/* Camera viewport */}
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video">
            <Webcam
              ref={webcamRef}
              videoConstraints={{ facingMode }}
              screenshotFormat="image/jpeg"
              screenshotQuality={0.9}
              className="w-full h-full object-cover"
              onUserMediaError={() => setError('Camera access denied. Please allow camera permissions.')}
            />

            {/* Scan overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Corner brackets */}
              <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-brand-gold rounded-tl-lg" />
              <div className="absolute top-6 right-6 w-10 h-10 border-r-2 border-t-2 border-brand-gold rounded-tr-lg" />
              <div className="absolute bottom-6 left-6 w-10 h-10 border-l-2 border-b-2 border-brand-gold rounded-bl-lg" />
              <div className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-brand-gold rounded-br-lg" />

              {/* Animated scan line */}
              {isScanning && (
                <div className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-brand-gold to-transparent animate-scan-line top-6" />
              )}
            </div>

            {/* Flip camera button */}
            <button
              onClick={() => setFacingMode((f) => f === 'environment' ? 'user' : 'environment')}
              className="absolute top-3 right-3 p-2 rounded-lg bg-black/40 text-white hover:bg-black/60 transition-colors"
            >
              <SwitchCamera className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleCapture}
            disabled={isScanning}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing with AI...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4" /> Scan Food
              </>
            )}
          </Button>
        </div>
      )}

      {scanMode === 'barcode' && (
        <div className="space-y-3">
          <div className="glass-card p-6 text-center space-y-4">
            <Barcode className="w-12 h-12 text-brand-gold mx-auto opacity-60" />
            <p className="text-sm text-zinc-400">Enter barcode number from product packaging</p>
            <input
              type="text"
              inputMode="numeric"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBarcodeScan()}
              placeholder="e.g. 0737628064502"
              className="w-full bg-brand-surface border border-brand-border rounded-xl px-4 py-3 text-zinc-100 text-center font-mono text-lg placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <Button
            variant="gold"
            size="lg"
            className="w-full"
            onClick={handleBarcodeScan}
            disabled={isScanning || !barcodeInput.trim()}
          >
            {isScanning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Looking up...
              </>
            ) : (
              <>
                <Barcode className="w-4 h-4" /> Look Up Product
              </>
            )}
          </Button>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/25 rounded-xl">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-xs text-red-300">{error}</p>
        </div>
      )}
    </div>
  );
}
