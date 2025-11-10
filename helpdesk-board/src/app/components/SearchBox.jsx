'use client';

export default function SearchBox({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search title or description"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-slate-700 bg-slate-900 p-2 text-slate-100 placeholder-slate-400"
    />
  );
}
