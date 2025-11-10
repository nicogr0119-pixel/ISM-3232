'use client';

export default function TicketCard({ ticket, isQueued, onAdd }) {
  const { title, priority, status, assignee, updatedAt, description } = ticket;
  const dateStr = new Date(updatedAt).toLocaleString();

  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 text-slate-100 p-4 shadow">
      <div className="text-xs mb-2 flex flex-wrap gap-3">
        <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">
          Priority: <b>{priority}</b>
        </span>
        <span className="px-2 py-1 rounded bg-slate-800 border border-slate-700">
          Status: <b>{status}</b>
        </span>
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-slate-300 mt-1">{description}</p>

      <div className="text-xs text-slate-400 mt-3">
        Assignee: <span className="font-medium text-slate-300">{assignee}</span>
        <span className="mx-2">•</span>
        Updated: {dateStr}
      </div>

      <div className="mt-4">
        <button
          onClick={onAdd}
          disabled={isQueued}
          className={`w-full rounded-lg px-3 py-2 text-sm font-medium ${
            isQueued
              ? 'bg-slate-700 text-slate-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500'
          }`}
        >
          {isQueued ? 'Already in My Queue' : 'Add to My Queue'}
        </button>
        {isQueued && (
          <p className="text-xs text-slate-400 mt-2">
            This ticket is already queued.
          </p>
        )}
      </div>
    </article>
  );
}
