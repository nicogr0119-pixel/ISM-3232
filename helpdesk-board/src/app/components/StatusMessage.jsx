'use client';

export default function StatusMessage({ loading, error, isEmpty }) {
  if (loading) {
    return (
      <div className="rounded-lg bg-slate-900 border border-slate-700 p-3 text-slate-200">
        Loading…
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-lg bg-red-900/30 border border-red-700 p-3 text-red-200">
        {error}
      </div>
    );
  }
  if (isEmpty) {
    return (
      <div className="rounded-lg bg-slate-900 border border-slate-700 p-3 text-slate-200">
        No tickets match your filters.
      </div>
    );
  }
  return null;
}
