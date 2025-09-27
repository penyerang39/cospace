"use client";

import Link from "next/link";
import { useState } from "react";
import { getNavigation, type MenuGroup } from "../lib/navigation";
import Image from "next/image";

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
      className="h-14 flex items-stretch"
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
        className={`absolute left-0 right-0 top-full z-50 mx-auto max-w-6xl border border-black/10 dark:border-white/10 bg-background shadow-lg transition-[opacity,transform] duration-200 ease-out ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-1"
        }`}
        role="menu"
      >
        <div className="grid grid-cols-12 gap-6 p-6">
          <div className="col-span-7">
            <ul className="grid grid-cols-2 gap-y-1">
              {group.href && (
                <li className="col-span-2">
                  <Link
                    className="block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
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
                    className="block px-3 py-2 rounded hover:bg-black/5 dark:hover:bg-white/10"
                    href={item.href}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-5">
            <div className="h-40 w-full rounded-md border border-black/10 dark:border-white/10 bg-background flex items-center justify-center">
              <span className="text-sm text-foreground/70">Image placeholder</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Navbar({ navigation }: { navigation: MenuGroup[] }) {
  const navGroups = navigation && navigation.length > 0 ? navigation : getNavigation();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-black/10 dark:border-white/10">
      <nav className="relative max-width container-padding">
        <div className="flex items-center justify-between h-14">
          <Link href="/" aria-label="Cospace home" className="flex items-center">
            <Image src="/branding/svg/neo14Logo.svg" alt="Cospace by NEO14" width={100} height={28} />
          </Link>

          <ul className="hidden sm:flex items-stretch h-14 ml-4">
            {navGroups.map(group => (
              <Dropdown key={group.label} group={group} />
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}


