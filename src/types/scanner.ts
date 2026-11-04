export type ScanMode = 'barcode' | 'document' | 'history';

export interface ScannedItem {
  id: string;
  type: 'qr' | 'barcode' | 'document' | 'text';
  content: string;
  format?: string;
  timestamp: number;
  previewUrl?: string;
  meta?: {
    fileSize?: string;
    filterApplied?: string;
    detectedType?: string;
  };
}

export type DocumentFilter = 'original' | 'grayscale' | 'contrast' | 'blackwhite';

