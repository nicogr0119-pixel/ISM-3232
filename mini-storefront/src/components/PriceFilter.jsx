"use client";

export default function PriceFilter({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value); // keep as string
  };

  return (
    <div>
      <label className="block mb-1 font-medium">Max Price</label>
      <input
        type="number"
        value={value}
        onChange={handleChange}
        placeholder="No limit"
        className="w-full border border-card p-2 rounded-lg bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
      />
    </div>
  );
}
