'use client';
// ============================================================
// Premium Petrol Radar — ReportModal Component
// Crowdsourcing modal for community fuel grade reports
// ============================================================
import { useState } from 'react';
import { X } from 'lucide-react';
import type { StationMarker, Brand, GradeName } from '@/lib/types';
import { GRADE_COLORS } from '@/lib/constants';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (station: StationMarker) => void;
  userLat?: number;
  userLng?: number;
}

const GRADE_OPTIONS: { value: GradeName; label: string; ron: number }[] = [
  { value: 'XP100',   label: 'IOCL XP100 (100 RON)',   ron: 100 },
  { value: 'Power100', label: 'HPCL Power100 (100 RON)', ron: 100 },
  { value: 'Power99', label: 'HPCL Power 99 (99 RON)',  ron: 99 },
  { value: 'Speed97', label: 'BPCL Speed 97 (97 RON)',  ron: 97 },
  { value: 'XP95',    label: 'IOCL XP95 (95 RON)',      ron: 95 },
  { value: 'E20',     label: 'Standard E20 (87 RON)',   ron: 87 },
  { value: 'E10',     label: 'Standard E10 (87 RON)',   ron: 87 },
];

const ETHANOL_OPTIONS = [
  { value: 0,    label: '~0% (Trace/None)' },
  { value: 4.5,  label: '≤ 4.5% Ethanol' },
  { value: 10,   label: '~10% Ethanol' },
  { value: 11,   label: '≤ 11% Ethanol' },
  { value: 12,   label: '≤ 12% Ethanol' },
  { value: 15,   label: '≤ 15% Ethanol' },
  { value: 20,   label: '~20% Ethanol (E20)' },
];

const BRAND_OPTIONS: Brand[] = ['IndianOil', 'HPCL', 'BPCL', 'Shell', 'Nayara', 'Reliance', 'Other'];

export default function ReportModal({
  isOpen,
  onClose,
  onSubmit,
  userLat,
  userLng,
}: ReportModalProps) {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState<Brand>('IndianOil');
  const [grade, setGrade] = useState<GradeName>('XP100');
  const [ethanol, setEthanol] = useState(0);
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [queueWait, setQueueWait] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const selectedGrade = GRADE_OPTIONS.find((g) => g.value === grade)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const newStation: StationMarker = {
      id: `RPT-${Date.now()}`,
      name,
      brand,
      city,
      state: '',
      lat: userLat || 19.076 + (Math.random() - 0.5) * 0.1,
      lng: userLng || 72.877 + (Math.random() - 0.5) * 0.1,
      gradeName: grade,
      ronRating: selectedGrade.ron,
      ethanolPct: ethanol,
      pricePerLitre: parseFloat(price) || 0,
      availabilityStatus: 'Just Reported',
      lastVerified: new Date().toISOString().split('T')[0],
      verified: false,
      queueWaitMins: queueWait,
    };

    onSubmit(newStation);

    // Reset form
    setTimeout(() => {
      setName('');
      setPrice('');
      setCity('');
      setQueueWait(0);
      setSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div
        className="bg-slate-50/95 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/20 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden animate-in"
      >

        <div className="p-6">
          {/* Title */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">Report Fuel Availability</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Help the Indian car & bike community track clean fuel.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Station Name */}
            <div>
              <label className="block text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1.5">
                Station Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., IOCL COCO, Bandra West"
                className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600"
              />
            </div>

            {/* Brand + Grade */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1.5">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value as Brand)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                >
                  {BRAND_OPTIONS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1.5">Fuel Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as GradeName)}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                >
                  {GRADE_OPTIONS.map((g) => (
                    <option key={g.value} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Ethanol + Price */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1.5">
                  Est. Ethanol %
                </label>
                <select
                  value={ethanol}
                  onChange={(e) => setEthanol(parseFloat(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors"
                >
                  {ETHANOL_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1.5">
                  Price (₹/L)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="160.00"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* City + Queue */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1.5">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g., Mumbai"
                  className="w-full bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-600"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1.5">
                  Queue Wait (min)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="60"
                    value={queueWait}
                    onChange={(e) => setQueueWait(parseInt(e.target.value))}
                    className="flex-1 accent-slate-400"
                  />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 min-w-[28px] text-right">
                    {queueWait}m
                  </span>
                </div>
              </div>
            </div>

            {userLat && userLng && (
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2">
                GPS coordinates auto-detected ({userLat.toFixed(4)}, {userLng.toFixed(4)})
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-50 text-white dark:text-slate-900 font-bold py-3 rounded-xl transition-all duration-300 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Radar Pin'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
