"use client";

import Link from "next/link";
import { useStore } from "./store/store";

function NotFound() {
  const { resetOpenedPages } = useStore();

  return (
    <main className="mt-4 space-y-6 text-center">
      <h1 className="text-3xl font-semibold">Looks like you’re lost 😅</h1>
      <Link
        href="/"
        className="bg-primary-800 inline-block rounded-xl px-6 py-3 text-lg text-red-600"
        onClick={resetOpenedPages}
      >
        go back safe place
      </Link>
    </main>
  );
}

export default NotFound;
