'use client';

import { useEffect, useMemo, useState } from 'react';
import TicketList from './TicketList';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import SearchBox from './SearchBox';
import MyQueueSummary from './MyQueueSummary';
import StatusMessage from './StatusMessage';
import { priorityOrder, statusOrder } from '../lib/severity';

const STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'On Hold', 'Resolved'];
const PRIORITY_OPTIONS = ['All', 'Low', 'Medium', 'High', 'Critical'];

export default function Board() {
  // lifted state
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({}); // { [id]: true }

  // fetch on mount
  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const res = await fetch('/api/tickets');
        if (!res.ok) throw new Error('Bad response');
        const data = await res.json();
        if (!cancelled) setTickets(data);
      } catch (e) {
        if (!cancelled) setError('Unable to load tickets.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // live updates (status/priority changes)
  useEffect(() => {
    if (!tickets.length) return;

    let cancelled = false;

    const nextDelay = () => {
      // 6–10 seconds randomized
      return 6000 + Math.floor(Math.random() * 4000);
    };

    const realisticStatusNext = (s) => {
      switch (s) {
        case 'Open': return 'In Progress';
        case 'In Progress': return Math.random() < 0.7 ? 'On Hold' : 'Resolved';
        case 'On Hold': return Math.random() < 0.6 ? 'In Progress' : 'Open';
        default: return 'Resolved';
      }
    };
    const realisticPriorityNext = (p) => {
      const steps = ['Low', 'Medium', 'High', 'Critical'];
      const i = steps.indexOf(p);
      // small chance to go up/down one step
      const delta = Math.random() < 0.5 ? 1 : -1;
      const ni = Math.min(steps.length - 1, Math.max(0, i + delta));
      return steps[ni];
    };

    const tick = () => {
      if (cancelled) return;
      setTickets((prev) => {
        if (!prev.length) return prev;
        const idx = Math.floor(Math.random() * prev.length);
        const chosen = prev[idx];
        const changeStatus = Math.random() < 0.6; // more likely to move status
        const updated = {
          ...chosen,
          status: changeStatus ? realisticStatusNext(chosen.status) : chosen.status,
          priority: changeStatus ? chosen.priority : realisticPriorityNext(chosen.priority),
          updatedAt: new Date().toISOString(),
        };
        const copy = prev.slice();
        copy[idx] = updated;
        return copy;
      });
      // schedule next
      timeout = setTimeout(tick, nextDelay());
    };

    let timeout = setTimeout(tick, nextDelay());
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [tickets.length]); // start after initial load

  // derived visible tickets
  const visibleTickets = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tickets.filter((t) => {
      const byStatus = filters.status === 'All' || t.status === filters.status;
      const byPriority = filters.priority === 'All' || t.priority === filters.priority;
      const bySearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      return byStatus && byPriority && bySearch;
    });
  }, [tickets, filters, search]);

  // queue handlers
  const addToQueue = (id) => {
    setQueue((prev) => (prev[id] ? prev : { ...prev, [id]: true }));
  };
  const removeFromQueue = (id) => {
    setQueue((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
  };
  const clearQueue = () => setQueue({});

  // options for controlled inputs
  const onStatusChange = (val) => setFilters((f) => ({ ...f, status: val }));
  const onPriorityChange = (val) => setFilters((f) => ({ ...f, priority: val }));

  const isEmpty = !loading && !error && visibleTickets.length === 0;

  return (
    <div className="grid gap-6">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <StatusFilter
            value={filters.status}
            options={STATUS_OPTIONS}
            onChange={onStatusChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Priority</label>
          <PriorityFilter
            value={filters.priority}
            options={PRIORITY_OPTIONS}
            onChange={onPriorityChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Search</label>
          <SearchBox value={search} onChange={setSearch} />
        </div>
      </div>

      {/* Status message */}
      <StatusMessage loading={loading} error={error} isEmpty={isEmpty} />

      {/* Ticket list */}
      {!loading && !error && visibleTickets.length > 0 && (
        <TicketList
          tickets={visibleTickets}
          queuedMap={queue}
          onAddToQueue={addToQueue}
        />
      )}

      {/* My Queue */}
      <MyQueueSummary
        tickets={tickets}
        queuedMap={queue}
        onRemove={removeFromQueue}
        onClear={clearQueue}
      />
    </div>
  );
}
