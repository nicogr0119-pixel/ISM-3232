'use client';

export default function MyQueueSummary({ tickets, queuedMap, onRemove, onClear }) {
  const queuedIds = Object.keys(queuedMap);
  const queuedTickets = tickets.filter((t) => queuedMap[t.id]);

  return (
    <aside className="rounded-xl border border-slate-700 bg-slate-950 text-slate-100 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Queue</h2>
        <span className="text-sm text-slate-300">Selected: {queuedIds.length}</span>
      </div>

      {queuedTickets.length === 0 ? (
        <p className="text-sm text-slate-400 mt-2">No tickets in your queue.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {queuedTickets.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm">{t.title}</p>
                <p className="text-xs text-slate-400">
                  {t.priority} • {t.status}
                </p>
              </div>
              <button
                onClick={() => onRemove(t.id)}
                className="rounded-md border border-slate-700 px-2 py-1 text-xs hover:bg-slate-800"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <button
          onClick={onClear}
          disabled={queuedTickets.length === 0}
          className={`w-full rounded-lg px-3 py-2 text-sm font-medium ${
            queuedTickets.length === 0
              ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-500'
          }`}
        >
          Clear Queue
        </button>
      </div>
    </aside>
  );
}
