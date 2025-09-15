import AdSlot from "@/components/ads/AdSlot";

export default function Footer() {
  return (
    <footer className="border-t p-4 text-center">
      <p>© 2025 Cenvia</p>
      <div className="mt-4">
        <AdSlot position="footer" />
      </div>
    </footer>
  );
}
