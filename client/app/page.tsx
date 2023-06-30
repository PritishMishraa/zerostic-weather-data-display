"use client";

import { CalendarForm } from "@/components/CalendarForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <h1 className="text-6xl font-bold text-center mb-10">Weather Data</h1>
      <CalendarForm />
    </main>
  );
}
