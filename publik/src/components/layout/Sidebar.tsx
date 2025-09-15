import AdSlot from "@/components/ads/AdSlot";

export default function Sidebar() {
  return (
    <aside className="w-64 p-4">
      <h3 className="font-bold mb-2">Sidebar</h3>
      <AdSlot position="sidebar" />
    </aside>
  );
}
