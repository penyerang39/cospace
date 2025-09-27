"use client";

import Link from "next/link";
import { useState } from "react";
import { getNavigation, type MenuGroup } from "../lib/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

function Dropdown({ group }: { group: MenuGroup }) {
  const [open, setOpen] = useState(false);
  const hasChildren = (group.items?.length ?? 0) > 0;

  if (!hasChildren) {
    return (
      <li className="h-16 flex items-stretch">
        <Link 
          className="px-4 h-full flex items-center text-foreground hover:text-foreground/80 transition-colors duration-200 font-medium relative group" 
          href={group.href || "#"}
        >
          {group.label}
          <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-hover:left-0" />
          <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent/30 blur-sm transition-all duration-300 group-hover:w-full group-hover:left-0" style={{ transform: 'translateY(2px)' }} />
        </Link>
      </li>
    );
  }

  return (
    <li
      className="h-16 flex items-stretch relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        className="px-4 h-full flex items-center text-foreground hover:text-foreground/80 transition-colors duration-200 font-medium relative"
        href={group.href || "#"}
        onClick={(e) => {
          // If there's no href or it's just "#", prevent navigation and toggle dropdown
          if (!group.href || group.href === "#") {
            e.preventDefault();
            setOpen(v => !v);
          }
        }}
      >
        {group.label}
      </Link>
      <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full group-hover:left-0 ${open ? 'w-full left-0' : ''}`} />
      <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent/30 blur-sm transition-all duration-300 group-hover:w-full group-hover:left-0 ${open ? 'w-full left-0' : ''}`} style={{ transform: 'translateY(2px)' }} />
      <div
        className={`fixed left-0 right-0 top-full z-50 border border-black/10 dark:border-white/10 bg-background/95 backdrop-blur-sm shadow-xl transition-[opacity,transform] duration-300 ease-out ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
        role="menu"
        style={{ top: '4rem' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8 p-8">
            <div className="col-span-7">
              <ul className="gap-y-2">
              {group.href && (
                <li className="col-span-2">
                  <div className="group">
                    <Link
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 group-hover:bg-black/5 dark:group-hover:bg-white/10"
                      href={group.href}
                      onClick={() => setOpen(false)}
                    >
                      <span className="font-medium text-foreground group-hover:text-foreground/80 transition-colors duration-200">
                        {group.label} overview
                      </span>
                      <ArrowRight 
                        className="w-4 h-4 text-foreground/60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 opacity-0 -translate-x-2"
                      />
                    </Link>
                  </div>
                </li>
              )}
              {group.items?.map(item => (
                <li key={item.href}>
                  <div className="group">
                    <Link
                      className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200 group-hover:bg-black/5 dark:group-hover:bg-white/10"
                      href={item.href}
                      onClick={() => setOpen(false)}
                    >
                      <span className="text-foreground group-hover:text-foreground/80 transition-colors duration-200">
                        {item.label}
                      </span>
                      <ArrowRight 
                        className="w-4 h-4 text-foreground/60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 opacity-0 -translate-x-2"
                      />
                    </Link>
                  </div>
                </li>
              ))}
              </ul>
            </div>
            <div className="col-span-5">
              <div className="h-48 w-full rounded-lg border border-black/10 dark:border-white/10 bg-gradient-to-br from-background to-background/50 flex items-center justify-center shadow-inner">
                <span className="text-sm text-foreground/50 font-medium">Image placeholder</span>
              </div>
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
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 border-b border-black/10 dark:border-white/10 shadow-sm">
      <nav className="relative max-width container-padding">
        <div className="flex items-center justify-between h-16">
          <Link href="/" aria-label="Cospace home" className="flex items-center group">
            <Image 
              src="/branding/svg/neo14Logo.svg" 
              alt="Cospace by NEO14" 
              width={120} 
              height={32} 
              className="transition-transform duration-200 group-hover:scale-105"
            />
          </Link>

          <ul className="hidden sm:flex items-stretch h-16 ml-6">
            {navGroups.map(group => (
              <Dropdown key={group.label} group={group} />
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}


