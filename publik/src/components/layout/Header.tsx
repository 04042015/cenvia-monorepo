import AdSlot from "@/components/ads/AdSlot";

export default function Header() {
  return (
    <header className="border-b p-4">
      <h1 className="text-xl font-bold">Cenvia</h1>
      <div className="mt-2">
        <AdSlot position="header" />
      </div>
    </header>
  );
}
