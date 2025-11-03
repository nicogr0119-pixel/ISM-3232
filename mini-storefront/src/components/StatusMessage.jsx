"use client";

export default function StatusMessage({ type, message }) {
  let content;
  switch (type) {
    case "loading":
      content = "Loading products...";
      break;
    case "error":
      content = message || "Something went wrong.";
      break;
    case "empty":
      content = "No products found.";
      break;
    default:
      content = "";
  }

  return <div className="card text-center font-medium">{content}</div>;
}
