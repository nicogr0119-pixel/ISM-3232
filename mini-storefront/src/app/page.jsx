import Catalog from "../components/Catalog";

export default function Page() {
  return (
    <main className="min-h-screen p-8 bg-background text-foreground transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-6 text-primary">
        Nico's Mini Storefront
      </h1>
      <Catalog />
    </main>
  );
}
