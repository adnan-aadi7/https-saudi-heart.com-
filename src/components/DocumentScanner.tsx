import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FileText, Upload, Download, RotateCw, Sliders, Check, Sparkles } from 'lucide-react';
import { ScannedItem, DocumentFilter } from '../types/scanner';

interface DocumentScannerProps {
  onSaveDocument: (item: ScannedItem) => void;
}

export const DocumentScanner: React.FC<DocumentScannerProps> = ({ onSaveDocument }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<DocumentFilter>('contrast');
  const [rotation, setRotation] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(105);
  const [contrastVal, setContrastVal] = useState<number>(125);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load a demo document if no user file yet
  const loadSampleDocument = () => {
    // Generate a clean sample receipt / document canvas and convert to dataURL
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = 600;
    sampleCanvas.height = 800;
    const ctx = sampleCanvas.getContext('2d');
    if (!ctx) return;

    // Document background with slight texture
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, 600, 800);

    // Draw document content
    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 24px system-ui, sans-serif';
    ctx.fillText('INVOICE / RECEIPT', 50, 70);

    ctx.fillStyle = '#64748b';
    ctx.font = '14px system-ui, sans-serif';
    ctx.fillText('OmniScan Automated Capture System', 50, 100);
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 50, 125);

    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(50, 145);
    ctx.lineTo(550, 145);
    ctx.stroke();

    ctx.fillStyle = '#1e293b';
    ctx.font = '16px monospace';
    const items = [
      ['React 18 + TypeScript Boilerplate', '$49.00'],
      ['Tailwind CSS Configuration', '$25.00'],
      ['Camera Viewfinder & Audio FX', '$30.00'],
      ['Document Image Processor Canvas', '$45.00'],
    ];

    let y = 190;
    items.forEach(([desc, price]) => {
      ctx.fillText(desc, 50, y);
      ctx.fillText(price, 480, y);
      y += 35;
    });

    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(550, y);
    ctx.stroke();

    ctx.font = 'bold 18px monospace';
    ctx.fillText('TOTAL DUE:', 50, y + 40);
    ctx.fillText('$149.00', 470, y + 40);

    // Add barcode at bottom
    ctx.fillStyle = '#0f172a';
    for (let x = 120; x < 480; x += Math.floor(Math.random() * 8) + 4) {
      ctx.fillRect(x, 620, Math.floor(Math.random() * 4) + 2, 70);
    }
    ctx.font = '12px monospace';
    ctx.fillText('*OMNI-98234-SCAN*', 230, 715);

    setSelectedImage(sampleCanvas.toDataURL('image/png'));
    setIsSaved(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setIsSaved(false);
    };
    reader.readAsDataURL(file);
  };

  // Re-process image on canvas whenever filters, brightness, contrast, or rotation change
  const renderProcessedImage = useCallback(() => {
    if (!selectedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const isRotatedQuarter = rotation % 180 !== 0;
      const width = isRotatedQuarter ? img.height : img.width;
      const height = isRotatedQuarter ? img.width : img.height;

      canvas.width = width;
      canvas.height = height;

      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.drawImage(img, -img.width / 2, -img.height / 2);
      ctx.restore();

      // Apply pixel level image processing
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;

      // Adjust contrast multiplier
      const contrastFactor = (259 * (contrastVal + 255)) / (255 * (259 - contrastVal));
      const brightnessOffset = brightness - 100;

      for (let i = 0; i < data.length; i += 4) {
        let r = data[i];
        let g = data[i + 1];
        let b = data[i + 2];

        // Brightness
        r += brightnessOffset;
        g += brightnessOffset;
        b += brightnessOffset;

        // Contrast
        r = contrastFactor * (r - 128) + 128;
        g = contrastFactor * (g - 128) + 128;
        b = contrastFactor * (b - 128) + 128;

        if (filter === 'grayscale') {
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          r = gray;
          g = gray;
          b = gray;
        } else if (filter === 'contrast') {
          // Document High-contrast: emphasize ink vs paper
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          const enhanced = gray < 130 ? gray * 0.7 : Math.min(255, gray * 1.25);
          r = enhanced;
          g = enhanced;
          b = enhanced;
        } else if (filter === 'blackwhite') {
          // Sharp thresholding
          const gray = 0.299 * r + 0.587 * g + 0.114 * b;
          const bw = gray > 140 ? 255 : 0;
          r = bw;
          g = bw;
          b = bw;
        }

        data[i] = Math.min(255, Math.max(0, r));
        data[i + 1] = Math.min(255, Math.max(0, g));
        data[i + 2] = Math.min(255, Math.max(0, b));
      }

      ctx.putImageData(imageData, 0, 0);
    };
    img.src = selectedImage;
  }, [selectedImage, filter, rotation, brightness, contrastVal]);

  useEffect(() => {
    renderProcessedImage();
  }, [renderProcessedImage]);

  // Rotate image clockwise by 90 deg
  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  // Download scanned document
  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `scanned-document-${Date.now()}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  // Save to History
  const handleSaveToHistory = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/jpeg', 0.85);
    const item: ScannedItem = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      type: 'document',
      content: `Document Scan (${filter} filter)`,
      timestamp: Date.now(),
      previewUrl: dataUrl,
      meta: {
        filterApplied: filter,
      },
    };
    onSaveDocument(item);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" />
              Document Scanner & Enhancer
            </h2>
            <p className="text-sm text-slate-400">
              Transform receipts, notes, and photos into high-contrast readable digital documents.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm cursor-pointer transition-colors shadow-lg shadow-indigo-600/30">
              <Upload className="w-4 h-4" />
              Choose Document
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>

            <button
              onClick={loadSampleDocument}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium text-sm transition-colors"
              title="Load Sample Document"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Sample
            </button>
          </div>
        </div>

        {/* Workspace: Preview and Control Panel */}
        {selectedImage ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Canvas Viewport */}
            <div className="lg:col-span-2 bg-slate-950 rounded-xl border border-slate-800 p-3 flex items-center justify-center min-h-[380px] overflow-auto">
              <canvas
                ref={canvasRef}
                className="max-h-[500px] w-auto max-w-full rounded shadow-md border border-slate-800 object-contain"
              />
            </div>

            {/* Filter Controls Sidebar */}
            <div className="space-y-5 bg-slate-950/60 p-5 rounded-xl border border-slate-800">
              <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                Scan Enhancements
              </h3>

              {/* Filters */}
              <div>
                <label className="text-xs text-slate-400 mb-2 block font-medium">Filter Preset</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'contrast', label: 'Document Sharp' },
                    { id: 'grayscale', label: 'Grayscale' },
                    { id: 'blackwhite', label: 'Black & White' },
                    { id: 'original', label: 'Original' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setFilter(f.id as DocumentFilter)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-left transition-colors ${
                        filter === f.id
                          ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Contrast Slider */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Contrast</span>
                  <span>{contrastVal}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={contrastVal}
                  onChange={(e) => setContrastVal(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Brightness Slider */}
              <div>
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Brightness</span>
                  <span>{brightness}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-indigo-500 h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Rotation & Action buttons */}
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={handleRotate}
                  className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  Rotate 90°
                </button>

                <button
                  onClick={handleDownload}
                  className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Enhanced Document
                </button>

                <button
                  onClick={handleSaveToHistory}
                  disabled={isSaved}
                  className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                >
                  {isSaved ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      Saved to History!
                    </>
                  ) : (
                    'Save to Scan History'
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div
            onClick={loadSampleDocument}
            className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl p-12 text-center cursor-pointer transition-colors bg-slate-950/40"
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-base font-semibold text-slate-200">No document selected</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
              Upload an image of a document or receipt, or click below to explore with our interactive sample invoice.
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                loadSampleDocument();
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 text-xs font-medium hover:bg-indigo-600/30 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              Load Interactive Sample
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

