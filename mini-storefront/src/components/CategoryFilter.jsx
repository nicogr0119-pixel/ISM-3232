"use client";

export default function CategoryFilter({ value, onChange }) {
  const categories = [
    "Electronics",
    "Furniture",
    "Stationery",
    "Kitchen",
    "Sports",
  ];

  return (
    <div>
      <label className="block mb-1 font-medium">Category</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
