'use client';

import TicketCard from './TicketCard';

export default function TicketList({ tickets, queuedMap, onAddToQueue }) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tickets.map((t) => (
        <TicketCard
          key={t.id}
          ticket={t}
          isQueued={!!queuedMap[t.id]}
          onAdd={() => onAddToQueue(t.id)}
        />
      ))}
    </section>
  );
}
