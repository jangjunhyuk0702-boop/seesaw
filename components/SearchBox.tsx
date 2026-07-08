"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

interface SearchBoxProps {
  defaultValue?: string;
  size?: "large" | "compact";
}

export default function SearchBox({
  defaultValue = "",
  size = "compact",
}: SearchBoxProps) {
  const [value, setValue] = useState(defaultValue);
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  const isLarge = size === "large";

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full ${isLarge ? "max-w-2xl" : "max-w-xl"} flex gap-2`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="이슈나 키워드를 검색해보세요 (예: 연금개혁)"
        className={`flex-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-5 ${
          isLarge ? "py-4 text-lg" : "py-2.5 text-sm"
        } focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-600`}
      />
      <button
        type="submit"
        className={`shrink-0 rounded-full bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-medium ${
          isLarge ? "px-8 py-4 text-lg" : "px-5 py-2.5 text-sm"
        } hover:opacity-90 transition`}
      >
        검색
      </button>
    </form>
  );
}
