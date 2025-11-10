'use client';

import { useEffect, useMemo, useState } from 'react';
import TicketList from './TicketList';
import StatusFilter from './StatusFilter';
import PriorityFilter from './PriorityFilter';
import SearchBox from './SearchBox';
import MyQueueSummary from './MyQueueSummary';
import StatusMessage from './StatusMessage';

const STATUS_OPTIONS = ['All', 'Open', 'In Progress', 'On Hold', 'Resolved'];
const PRIORITY_OPTIONS = ['All', 'Low', 'Medium', 'High', 'Critical'];

export default function Board() {
  // Lifted state
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({}); // { [ticketId]: true }

  // Fetch tickets on mount
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
    return () => {
      cancelled = true;
    };
  }, []);

  /**
   * Live updates effect:
   * - Every 6–10s, choose a random ticket and change either status or priority.
   * - Update updatedAt to now.
   * - Use recursive setTimeout so each tick gets a fresh randomized delay.
   * - Clean up the pending timeout on unmount or dependency change.
   */
  useEffect(() => {
    // Only start once we have data and no error
    if (loading || error || tickets.length === 0) return;

    // Helper transitions (kept simple & realistic)
    const nextStatus = (s) => {
      switch (s) {
        case 'Open':
          return 'In Progress';
        case 'In Progress':
          return Math.random() < 0.7 ? 'On Hold' : 'Resolved';
        case 'On Hold':
          return Math.random() < 0.6 ? 'In Progress' : 'Open';
        case 'Resolved':
        default:
          return 'Resolved';
      }
    };

    const nextPriority = (p) => {
      const levels = ['Low', 'Medium', 'High', 'Critical'];
      const i = levels.indexOf(p);
      // Nudge up or down by one step (bounded)
      const delta = Math.random() < 0.5 ? 1 : -1;
      const ni = Math.min(levels.length - 1, Math.max(0, i + delta));
      return levels[ni];
    };

    let timerId;

    const scheduleNextTick = () => {
      // Random delay 6–10 seconds
      const delay = 6000 + Math.floor(Math.random() * 4000);
      timerId = setTimeout(() => {
        // Apply one random change
        setTickets((prev) => {
          if (prev.length === 0) return prev;
          const idx = Math.floor(Math.random() * prev.length);
          const chosen = prev[idx];

          const changeStatus = Math.random() < 0.6; // slightly prefer status changes
          const updated = {
            ...chosen,
            status: changeStatus ? nextStatus(chosen.status) : chosen.status,
            priority: changeStatus ? chosen.priority : nextPriority(chosen.priority),
            updatedAt: new Date().toISOString(),
          };

          const copy = prev.slice();
          copy[idx] = updated;
          return copy;
        });

        // Queue next randomized tick
        scheduleNextTick();
      }, delay);
    };

    // Kick off the first tick
    scheduleNextTick();

    // Cleanup
    return () => {
      clearTimeout(timerId);
    };
    // We only depend on "loading/error/tickets.length"
    // so the loop starts after initial data is present and restarts if list goes from 0->N.
  }, [loading, error, tickets.length]);

  // Derived visible tickets (never store derived state)
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

  // Queue handlers
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

  // Controlled input handlers
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

      {/* Loading/Error/Empty */}
      <StatusMessage loading={loading} error={error} isEmpty={isEmpty} />

      {/* Ticket grid */}
      {!loading && !error && visibleTickets.length > 0 && (
        <TicketList
          tickets={visibleTickets}
          queuedMap={queue}
          onAddToQueue={addToQueue}
        />
      )}

      {/* Queue */}
      <MyQueueSummary
        tickets={tickets}
        queuedMap={queue}
        onRemove={removeFromQueue}
        onClear={clearQueue}
      />
    </div>
  );
}
