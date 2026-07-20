'use client';
// ============================================================
// Premium Petrol Radar — Request Area Modal
// ============================================================
import { useState } from 'react';
import { X, UploadCloud, MapPin, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import Papa from 'papaparse';
import type { StationMarker } from '@/lib/types';

interface RequestAreaModalProps {
  onClose: () => void;
  onBulkAdd?: (stations: StationMarker[]) => void;
}

export default function RequestAreaModal({ onClose, onBulkAdd }: RequestAreaModalProps) {
  const [tab, setTab] = useState<'single' | 'bulk'>('single');
  
  // Single Pump State
  const [stationName, setStationName] = useState('');
  const [mapsLink, setMapsLink] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);

  // Bulk State
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState<File | null>(null);
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [parsedStations, setParsedStations] = useState<StationMarker[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (tab === 'bulk' && file) {
      setSubmitting(true);
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const newStations: StationMarker[] = results.data.map((row: any) => ({
            id: `bulk-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: row.name || 'Unknown Station',
            lat: parseFloat(row.lat) || 0,
            lng: parseFloat(row.lng) || 0,
            gradeName: row.gradeName || 'Standard',
            pricePerLitre: parseFloat(row.pricePerLitre) || 0,
            verified: true,
            lastVerified: new Date().toISOString(),
            address: row.address || '',
            amenities: {
              air: true,
              nitrogen: false,
              washroom: true,
            },
          }));
          
          setParsedStations(newStations);
          setIsPreviewing(true);
          setSubmitting(false);
        },
        error: (err) => {
          console.error('PapaParse Error:', err);
          setSubmitting(false);
        }
      });
      return;
    }

    // Single upload mock
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    }, 1500);
  };

  const handleConfirmBulk = () => {
    setSubmitting(true);
    setTimeout(() => {
      if (onBulkAdd && parsedStations.length > 0) {
        onBulkAdd(parsedStations);
      }
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => onClose(), 2000);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-slate-50/95 dark:bg-slate-900/90 backdrop-blur-2xl border border-slate-200 dark:border-white/20 w-full max-w-lg rounded-3xl shadow-2xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 pb-4 flex items-start justify-between border-b border-slate-200 dark:border-slate-800/60">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-500" />
              Add Pump Data
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Help expand the map by adding a single pump or uploading bulk data.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        {!success && (
          <div className="px-6 pt-4 flex gap-2">
            <button
              onClick={() => setTab('single')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                tab === 'single'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-200/50 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              Single Pump
            </button>
            <button
              onClick={() => setTab('bulk')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${
                tab === 'bulk'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'bg-slate-200/50 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              Bulk Excel / CSV
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 pt-4">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <UploadCloud className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Data Submitted!</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Thank you for contributing to the Premium Petrol Radar.
              </p>
            </div>
          ) : isPreviewing ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileSpreadsheet className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Review CSV Data</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  We successfully parsed {parsedStations.length} stations from your file.
                </p>
              </div>

              <div className="bg-slate-100 dark:bg-slate-800/50 rounded-xl p-4 max-h-48 overflow-y-auto">
                <ul className="space-y-3">
                  {parsedStations.slice(0, 5).map((station, i) => (
                    <li key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="font-medium text-slate-700 dark:text-slate-300">{station.name}</span>
                      </div>
                      <span className="text-slate-500 bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs font-bold">
                        {station.gradeName}
                      </span>
                    </li>
                  ))}
                  {parsedStations.length > 5 && (
                    <li className="text-center text-xs text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
                      + {parsedStations.length - 5} more stations...
                    </li>
                  )}
                </ul>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsPreviewing(false)}
                  className="flex-1 py-3 text-sm font-bold text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-slate-800 rounded-xl hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmBulk}
                  disabled={submitting}
                  className="flex-[2] py-3 text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl shadow-lg transition-all disabled:opacity-50"
                >
                  {submitting ? 'Plotting on map...' : `Plot ${parsedStations.length} Stations`}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {tab === 'single' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Station Name
                    </label>
                    <input
                      type="text"
                      required
                      value={stationName}
                      onChange={(e) => setStationName(e.target.value)}
                      placeholder="e.g., IOCL COCO Bandra"
                      className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Google Maps Link
                    </label>
                    <input
                      type="url"
                      required
                      value={mapsLink}
                      onChange={(e) => setMapsLink(e.target.value)}
                      placeholder="https://maps.google.com/..."
                      className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Station Photo (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center hover:border-amber-500 dark:hover:border-amber-500 transition-colors bg-slate-50 dark:bg-slate-800/40 relative cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center pointer-events-none">
                        <UploadCloud className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-2 group-hover:text-amber-500 transition-colors" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {photo ? photo.name : 'Drop photo here, or click to browse'}
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                        City / Region
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g., Bangalore"
                        className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                        Pincode (Optional)
                      </label>
                      <input
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="e.g., 560001"
                        className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Upload Excel / CSV
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center hover:border-amber-500 dark:hover:border-amber-500 transition-colors bg-slate-50 dark:bg-slate-800/40 relative cursor-pointer group">
                      <input
                        type="file"
                        accept=".csv, .xlsx, .json"
                        required
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center pointer-events-none">
                        <FileSpreadsheet className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-2 group-hover:text-amber-500 transition-colors" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          {file ? file.name : 'Drop Excel / CSV file here'}
                        </span>
                        {!file && (
                          <span className="text-[10px] text-slate-500 mt-1">
                            Helps us add bulk stations to your area instantly.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                      Additional Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Any specific highways or fuel grades we should prioritize?"
                      rows={2}
                      className="w-full bg-white dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-amber-500 transition-colors placeholder:text-slate-400 resize-none"
                    />
                  </div>
                </>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold py-3.5 rounded-xl transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Uploading Data...' : 'Submit Request'}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
}
