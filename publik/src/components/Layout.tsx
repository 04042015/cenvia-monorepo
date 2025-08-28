import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-white">
      <main className="w-full">{children}</main>
    </div>
  );
}
