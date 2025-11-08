"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { getNavigation, type MenuGroup } from "../lib/navigation";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Menu, X, Calendar, DollarSign } from "lucide-react";
import previews from "../lib/nav-previews";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";
import MovingUnderline from "./MovingUnderline";

// Hide parent overview link for specific groups
const HIDE_OVERVIEW_FOR = new Set(["Company", "Legal"]);

function Dropdown({ group }: { group: MenuGroup }) {
  const [open, setOpen] = useState(false);
  const [hoverHref, setHoverHref] = useState<string | undefined>(undefined);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useTheme();
  const activeHref = hoverHref || group.href;
  const hasPreview = activeHref && (previews as Record<string, string>)[activeHref];
  const previewSrc = hasPreview ? (previews as Record<string, string>)[activeHref!] : (theme === 'dark' ? "/branding/neo14White.svg" : "/branding/neo14Logo.svg");
  const hasChildren = (group.items?.length ?? 0) > 0;

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  if (!hasChildren) {
    return (
      <li className="h-16 flex items-stretch">
        <Link 
          className="px-4 h-full flex items-center text-foreground hover:text-foreground/80 transition-colors duration-200 font-medium relative group" 
          href={group.href || "#"}
          data-nav-item
        >
          {group.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="h-16 flex items-stretch relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        className="px-4 h-full flex items-center text-foreground hover:text-foreground/80 transition-colors duration-200 font-medium relative"
        href={group.href || "#"}
        data-nav-item
        onClick={(event) => {
          // If there's no href, it's just "#", or it's a Legal parent link, prevent navigation and toggle dropdown
          if (!group.href || group.href === "#" || (group.label === "Legal" && group.href === "/legal")) {
            event.preventDefault();
            setOpen(previousOpen => !previousOpen);
          }
        }}
      >
        {group.label}
      </Link>
      <div
        className={`fixed left-0 right-0 bg-background border-b border-black/10 shadow-lg transition-[opacity,transform] duration-200 ease-out ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
        role="menu"
        style={{ zIndex: 59, top: '64px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-12 gap-8 p-8">
            <div className="col-span-7">
              <ul className="gap-y-2">
              {group.href && !HIDE_OVERVIEW_FOR.has(group.label) && (
                <li className="col-span-2">
                  <div className="group">
                    <Link
                      className="flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200"
                      href={group.href}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setHoverHref(group.href)}
                      onMouseLeave={() => setHoverHref(undefined)}
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
              {(group.items ?? []).map(navItem => (
                <li key={navItem.href}>
                  <div className="group">
                    <Link
                      className="flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200"
                      href={navItem.href}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setHoverHref(navItem.href)}
                      onMouseLeave={() => setHoverHref(undefined)}
                    >
                      <span className="text-foreground group-hover:text-foreground/80 transition-colors duration-200">
                        {navItem.label}
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
              <div className="h-48 w-full overflow-hidden relative">
                <Image
                  src={previewSrc}
                  alt="Section preview"
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 41.666vw, (min-width: 640px) 50vw, 100vw"
                  quality={95}
                  className={hasPreview ? "object-cover" : "object-contain"}
                  priority={false}
                  style={{ imageRendering: 'auto' }}
                />
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeParentLabel, setActiveParentLabel] = useState<string | null>(null);
  const { theme } = useTheme();
  const desktopNavRef = useRef<HTMLUListElement | null>(null);
  const activeParent: MenuGroup | undefined = useMemo(() => {
    if (!activeParentLabel) return undefined;
    return navGroups.find(navGroup => navGroup.label === activeParentLabel);
  }, [activeParentLabel, navGroups]);

  const logoSrc = theme === 'dark' ? "/branding/neo14White.svg" : "/branding/neo14Logo.svg";

  return (
    <>
    <header className="sticky top-0 z-[60] bg-background supports-[backdrop-filter]:bg-background border-b border-black/10 navbar-dark-theme">
      <nav className="relative max-width container-padding">
        <div className="flex items-center justify-between h-16">
          <Link href="/" aria-label="Cospace home" className="flex items-center group">
            <Image 
              src={logoSrc}
              alt="Cospace by NEO14" 
              width={120} 
              height={32} 
              quality={100}
              className="transition-transform duration-200"
              style={{ imageRendering: 'auto' }}
            />
          </Link>

          {/* Desktop navigation */}
          <ul className="hidden sm:flex items-stretch h-16 ml-6 relative" ref={desktopNavRef}>
            {navGroups.map(navGroup => (
              <Dropdown key={navGroup.label} group={navGroup} />
            ))}
            <MovingUnderline containerRef={desktopNavRef} />
          </ul>

          {/* Desktop action buttons */}
          <div className="hidden md:flex items-center gap-3 ml-auto mr-4">
            <Link href="/demo" className="navbar-demo-btn-wrapper">
              <button className="navbar-action-btn">
                <Calendar className="w-4 h-4" />
                <span>Book Demo</span>
              </button>
            </Link>
            <Link href="/request">
              <button className="navbar-action-btn">
                <DollarSign className="w-4 h-4" />
                <span>Pricing</span>
              </button>
            </Link>
          </div>

          {/* Theme toggle and mobile hamburger */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              type="button"
              className="sm:hidden inline-flex items-center justify-center rounded-md p-2 pr-0 text-foreground hover:text-foreground/80 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => {
                // Close any active sub-view when toggling
                setMobileOpen(previousMobileOpen => !previousMobileOpen);
                if (mobileOpen) setActiveParentLabel(null);
              }}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
    </header>
    {/* Mobile full-screen overlay moved outside header to cover viewport */}
    <div
      className={`sm:hidden fixed inset-0 z-50 bg-background transition-[opacity,transform] duration-300 ease-out ${
        mobileOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
      }`}
      role="dialog"
      aria-modal="true"
    >
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        <div className="h-16 border-b border-black/10">
          <div className="relative max-width container-padding h-full flex items-center justify-between">
            <Link href="/" aria-label="Cospace home" className="flex items-center group">
              <Image 
                src={logoSrc}
                alt="Cospace by NEO14" 
                width={120} 
                height={32} 
                quality={100}
                className="transition-transform duration-200"
                style={{ imageRendering: 'auto' }}
              />
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 pr-0 text-foreground hover:text-foreground/80  transition-colors"
                aria-label="Close menu"
                onClick={() => {
                  setMobileOpen(false);
                  setActiveParentLabel(null);
                }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding views container for fluid transition */}
        <div className="relative flex-1 overflow-hidden">
          {/* Parents list view */}
          <div
            className={`absolute inset-0 overflow-y-auto py-0 transition-transform duration-300 ease-out ${
              activeParent ? "translate-x-[-100%]" : "translate-x-0"
            }`}
            aria-hidden={!!activeParent}
          >
            <ul>
              {navGroups.map(navGroup => {
                const hasChildren = (navGroup.items?.length ?? 0) > 0;
                return (
                  <li key={navGroup.label}>
                    <button
                      className="w-full text-left border border-black/10 border-1px px-4 py-5 flex items-center justify-between transition-colors"
                      onClick={() => {
                        if (hasChildren) {
                          setActiveParentLabel(navGroup.label);
                        } else if (navGroup.href && !(navGroup.label === "Legal" && navGroup.href === "/legal")) {
                          window.location.href = navGroup.href;
                        }
                      }}
                      aria-haspopup={hasChildren ? "true" : undefined}
                      aria-expanded={hasChildren ? false : undefined}
                    >
                      <span className="font-medium text-foreground">{navGroup.label}</span>
                      {hasChildren ? (
                        <ArrowRight className="h-5 w-5 text-foreground/60" />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Children view for active parent */}
          <div
            className={`absolute inset-0 overflow-y-auto py-2 transition-transform duration-300 ease-out ${
              activeParent ? "translate-x-0" : "translate-x-full"
            }`}
            aria-hidden={!activeParent}
          >
            {activeParent && (
              <div className="min-h-full flex flex-col">
                <div className="px-4 py-3 flex items-center gap-3">
                  <button
                    type="button"
                    className="rounded-md px-3 py-3 border-1px transition-colors text-foreground inline-flex items-center gap-2"
                    onClick={() => setActiveParentLabel(null)}
                    aria-label="Back to parent list"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>
                  <span className="rounded-full border border-black/10 border-1px px-3 py-1 text-foreground/90">
                    {activeParent.label}
                  </span>
                </div>
                <ul className="py-2">
                  {activeParent.href && !HIDE_OVERVIEW_FOR.has(activeParent.label) && (
                    <li>
                      <Link
                        href={activeParent.href}
                        className="block px-4 py-5 transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="font-medium text-foreground">{activeParent.label} overview</span>
                      </Link>
                    </li>
                  )}
                  {(activeParent.items ?? []).map(childItem => (
                      <li key={childItem.href}>
                        <Link
                          href={childItem.href}
                          className="flex items-center  border border-black/10 border-1px justify-between px-4 py-5 rounded-md transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="text-foreground">{childItem.label}</span>
                        </Link>
                      </li>
                  ))}
                </ul>
                <div className="px-4 pb-6 mt-auto flex flex-col gap-3">
                    <Link href="/demo" className="w-full">
                      <button className="navbar-action-btn w-full">
                        <Calendar className="w-4 h-4" />
                        <span>Book Demo</span>
                      </button>
                    </Link>
                    <Link href="/request" className="w-full">
                      <button className="navbar-action-btn w-full">
                        <DollarSign className="w-4 h-4" />
                        <span>Pricing</span>
                      </button>
                    </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}


