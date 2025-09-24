"use client";

import Link from "next/link";
import { useState } from "react";
import { getNavigation, type MenuGroup } from "../lib/navigation";

function Dropdown({ group }: { group: MenuGroup }) {
  const [open, setOpen] = useState(false);
  const hasChildren = (group.items?.length ?? 0) > 0;

  if (!hasChildren) {
    return (
      <li className="h-14 flex items-stretch">
        <Link className="px-3 h-full flex items-center hover:underline" href={group.href || "#"}>
          {group.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative group h-14 flex items-stretch"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="px-3 h-full flex items-center hover:underline"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        {group.label}
      </button>
      <div
        className={`absolute left-0 mt-2 min-w-[240px] rounded-md border border-black/10 dark:border-white/10 bg-white dark:bg-black shadow-lg z-50 ${
          open ? "block" : "hidden"
        }`}
        role="menu"
      >
        <ul className="py-2">
          {group.href && (
            <li>
              <Link
                className="block px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                href={group.href}
                onClick={() => setOpen(false)}
              >
                {group.label} overview
              </Link>
            </li>
          )}
          {group.items?.map(item => (
            <li key={item.href}>
              <Link
                className="block px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export default function Navbar({ navigation }: { navigation: MenuGroup[] }) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="font-semibold tracking-[-.02em]">cospace</Link>
          <ul className="flex items-center gap-1">
            {navigation.map(group => (
              <Dropdown key={group.label} group={group} />
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}


