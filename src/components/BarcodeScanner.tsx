import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Camera, CameraOff, Upload, Sparkles, AlertCircle, CheckCircle2, Copy, ExternalLink, Zap } from 'lucide-react';
import { ScannedItem } from '../types/scanner';
import { playScanBeep } from '../utils/audio';

interface BarcodeScannerProps {
  onScanResult: (item: ScannedItem) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanResult }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [lastScanned, setLastScanned] = useState<ScannedItem | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Stop video stream
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  }, []);

  // Start video stream
  const startCamera = async () => {
    setCameraError(null);
    stopCamera();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsScanning(true);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to access camera.';
      setCameraError(
        message.includes('Permission') 
          ? 'Camera permission was denied. Please allow camera access in your browser settings.'
          : `Camera error: ${message}`
      );
      setIsScanning(false);
    }
  };

  // Toggle torch / flashlight if supported
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track) {
      try {
        const capabilities = (track.getCapabilities?.() as { torch?: boolean }) || {};
        if (capabilities.torch) {
          const nextTorch = !torchOn;
          await track.applyConstraints({
            advanced: [{ torch: nextTorch } as MediaTrackConstraintSet],
          });
          setTorchOn(nextTorch);
        } else {
          alert('Flashlight is not supported on this camera device.');
        }
      } catch (e) {
        console.warn('Torch control error:', e);
      }
    }
  };

  // Switch between front and back camera
  const switchCamera = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
  };

  useEffect(() => {
    if (isScanning) {
      startCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facingMode]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleDetectedCode = useCallback((rawValue: string, format = 'QR / Barcode') => {
    playScanBeep();
    const isUrl = /^https?:\/\//i.test(rawValue);
    const item: ScannedItem = {
      id: `scan-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: isUrl ? 'qr' : 'barcode',
      content: rawValue,
      format: format,
      timestamp: Date.now(),
      meta: {
        detectedType: isUrl ? 'URL' : 'Text / Code',
      },
    };

    setLastScanned(item);
    onScanResult(item);
  }, [onScanResult]);

  // Handle native BarcodeDetector scan loop if available
  useEffect(() => {
    if (!isScanning || !videoRef.current) return;

    let animationFrameId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const barcodeDetectorClass = (window as any).BarcodeDetector;

    if (barcodeDetectorClass) {
      const detector = new barcodeDetectorClass({
        formats: ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39', 'upc_a', 'upc_e'],
      });

      const detectFrame = async () => {
        if (videoRef.current && videoRef.current.readyState >= 2) {
          try {
            const barcodes = await detector.detect(videoRef.current);
            if (barcodes.length > 0) {
              const detected = barcodes[0];
              handleDetectedCode(detected.rawValue, detected.format || 'Detected Barcode');
            }
          } catch {
            // Detection error or frame skipped
          }
        }
        animationFrameId = requestAnimationFrame(detectFrame);
      };

      animationFrameId = requestAnimationFrame(detectFrame);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isScanning, handleDetectedCode]);

  // Handle local image file upload for scanning
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const img = new Image();
      img.onload = async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const barcodeDetectorClass = (window as any).BarcodeDetector;
        if (barcodeDetectorClass) {
          try {
            const detector = new barcodeDetectorClass();
            const codes = await detector.detect(img);
            if (codes.length > 0) {
              handleDetectedCode(codes[0].rawValue, codes[0].format || 'Image Barcode');
              return;
            }
          } catch (err) {
            console.warn(err);
          }
        }

        // Fallback for file upload demo scan
        handleDetectedCode(
          `UPLOADED_FILE: ${file.name} (${Math.round(file.size / 1024)} KB)`,
          'File Upload'
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Demo scan presets for quick testing without needing printed barcodes
  const triggerDemoScan = (type: 'url' | 'wifi' | 'product') => {
    const demoItems = {
      url: 'https://github.com/facebook/react',
      wifi: 'WIFI:S:Guest_Network;T:WPA;P:SuperSecret123;;',
      product: '0123456789012 (UPC-A)',
    };
    handleDetectedCode(demoItems[type], `Demo ${type.toUpperCase()}`);
  };

  const copyToClipboard = () => {
    if (!lastScanned) return;
    navigator.clipboard.writeText(lastScanned.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        {/* Top Header inside panel */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-400" />
              Live Scanner
            </h2>
            <p className="text-sm text-slate-400">
              Point your camera at any Barcode or QR code, or upload an image file.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {!isScanning ? (
              <button
                onClick={startCamera}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-lg shadow-indigo-600/30"
              >
                <Camera className="w-4 h-4" />
                Start Camera
              </button>
            ) : (
              <>
                <button
                  onClick={toggleTorch}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    torchOn 
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="Toggle Torch"
                >
                  <Zap className="w-4 h-4" />
                  Torch
                </button>

                <button
                  onClick={switchCamera}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-sm font-medium transition-colors"
                  title="Switch Front/Back Camera"
                >
                  Flip
                </button>

                <button
                  onClick={stopCamera}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 font-medium text-sm transition-colors"
                >
                  <CameraOff className="w-4 h-4" />
                  Stop
                </button>
              </>
            )}

            <label className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        </div>

        {/* Error message */}
        {cameraError && (
          <div className="mb-4 p-4 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold">Camera Access Notice</p>
              <p className="text-rose-300/90">{cameraError}</p>
            </div>
          </div>
        )}

        {/* Viewfinder Video Container */}
        <div className="relative aspect-video max-h-[440px] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
          <video
            ref={videoRef}
            playsInline
            muted
            className={`w-full h-full object-cover ${!isScanning ? 'hidden' : 'block'}`}
          />
          <canvas ref={canvasRef} className="hidden" />

          {/* Fallback View when camera is stopped */}
          {!isScanning && (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-base font-semibold text-slate-200">Camera is in standby</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Click "Start Camera" above to scan live codes with your webcam, or choose a file from your computer.
              </p>
            </div>
          )}

          {/* Viewfinder Scanning Overlay */}
          {isScanning && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Target Aim Box */}
              <div className="w-64 h-64 sm:w-80 sm:h-80 border-2 border-dashed border-indigo-400/70 rounded-2xl relative shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]">
                {/* Corner Markers */}
                <span className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-indigo-400 rounded-tl-lg" />
                <span className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-indigo-400 rounded-tr-lg" />
                <span className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-indigo-400 rounded-bl-lg" />
                <span className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-indigo-400 rounded-br-lg" />

                {/* Animated Laser Bar */}
                <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent shadow-[0_0_12px_#818cf8] animate-scan" />
              </div>
            </div>
          )}
        </div>

        {/* Quick Demo Scan triggers */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Test with sample codes:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerDemoScan('url')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Demo URL
            </button>
            <button
              onClick={() => triggerDemoScan('wifi')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Demo Wi-Fi
            </button>
            <button
              onClick={() => triggerDemoScan('product')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              Demo Barcode
            </button>
          </div>
        </div>
      </div>

      {/* Latest Scanned Result Banner */}
      {lastScanned && (
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Latest Scan Detected</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                {lastScanned.format}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              {new Date(lastScanned.timestamp).toLocaleTimeString()}
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-sm break-all text-slate-200">
            {lastScanned.content}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? 'Copied!' : 'Copy Code'}
            </button>

            {lastScanned.content.startsWith('http') && (
              <a
                href={lastScanned.content}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open URL
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

