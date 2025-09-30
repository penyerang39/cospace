"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { getNavigation, type MenuGroup } from "../lib/navigation";
import Image from "next/image";
import { ArrowRight, ArrowLeft, Menu, X } from "lucide-react";
import previews from "../lib/nav-previews";

const productImages = [
  "/product/Picture1.png",
  "/product/Picture2.png",
  "/product/Picture3.png",
  "/product/Picture4.png",
  "/product/Picture5.png",
  "/product/Picture6.png",
  "/product/Picture7.png",
  "/product/Picture8.png",
  "/product/dashboards.png",
  "/product/datamodel.png",
  "/product/updated_data1.png",
  "/product/data-spider-web.png",
  "/product/updated_data.png",
  "/product/updated_chat.png",
  "/product/updated_projects.png",
  "/product/updated_files.png",
  "/product/files_main_screen.png",
];

// Hide parent overview link for specific groups
const HIDE_OVERVIEW_FOR = new Set(["Company", "Legal"]);

function useRandomProductImage() {
  const chosenRef = useRef<string | null>(null);
  if (!chosenRef.current) {
    const idx = Math.floor(Math.random() * productImages.length);
    chosenRef.current = productImages[idx];
  }
  return chosenRef.current as string;
}

function Dropdown({ group }: { group: MenuGroup }) {
  const [open, setOpen] = useState(false);
  const [hoverHref, setHoverHref] = useState<string | undefined>(undefined);
  const fallbackImage = useRandomProductImage();
  const activeHref = hoverHref || group.href;
  const previewSrc = (activeHref && (previews as Record<string, string>)[activeHref]) || fallbackImage;
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
        className={`fixed left-0 right-0 top-full z-50 border border-black/10 bg-background/95 backdrop-blur-sm shadow-xl transition-[opacity,transform] duration-300 ease-out ${
          open ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
        }`}
        role="menu"
        style={{ top: '4rem' }}
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
              {group.items?.map(item => (
                <li key={item.href}>
                  <div className="group">
                    <Link
                      className="flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200"
                      href={item.href}
                      onClick={() => setOpen(false)}
                      onMouseEnter={() => setHoverHref(item.href)}
                      onMouseLeave={() => setHoverHref(undefined)}
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
              <div className="h-48 w-full overflow-hidden rounded-lg border border-black/10 bg-gradient-to-br from-background to-background/50 relative shadow-inner">
                <Image
                  src={previewSrc}
                  alt="Section preview"
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 1024px) 41.666vw, (min-width: 640px) 50vw, 100vw"
                  quality={90}
                  className="object-cover"
                  priority={false}
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
  const activeParent: MenuGroup | undefined = useMemo(() => {
    if (!activeParentLabel) return undefined;
    return navGroups.find(g => g.label === activeParentLabel);
  }, [activeParentLabel, navGroups]);

  return (
    <>
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 border-b border-black/10 shadow-sm">
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

          {/* Desktop navigation */}
          <ul className="hidden sm:flex items-stretch h-16 ml-6">
            {navGroups.map(group => (
              <Dropdown key={group.label} group={group} />
            ))}
          </ul>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center rounded-md p-2 pr-0 text-foreground hover:text-foreground/80 transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              // Close any active sub-view when toggling
              setMobileOpen(v => !v);
              if (mobileOpen) setActiveParentLabel(null);
            }}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>
    </header>
    {/* Mobile full-screen overlay moved outside header to cover viewport */}
    <div
      className={`sm:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-md transition-[opacity,transform] duration-300 ease-out ${
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
                src="/branding/svg/neo14Logo.svg" 
                alt="Cospace by NEO14" 
                width={120} 
                height={32} 
                className="transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
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
              {navGroups.map(group => {
                const hasChildren = (group.items?.length ?? 0) > 0;
                return (
                  <li key={group.label}>
                    <button
                      className="w-full text-left border border-black/10 border-1px px-4 py-5 flex items-center justify-between transition-colors"
                      onClick={() => {
                        if (hasChildren) {
                          setActiveParentLabel(group.label);
                        } else if (group.href) {
                          window.location.href = group.href;
                        }
                      }}
                      aria-haspopup={hasChildren ? "true" : undefined}
                      aria-expanded={hasChildren ? false : undefined}
                    >
                      <span className="font-medium text-foreground">{group.label}</span>
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
                  {(activeParent.items ?? []).map(item => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="flex items-center  border border-black/10 border-1px justify-between px-4 py-5 rounded-md transition-colors"
                          onClick={() => setMobileOpen(false)}
                        >
                          <span className="text-foreground">{item.label}</span>
                        </Link>
                      </li>
                  ))}
                </ul>
                <div className="px-4 pb-6 mt-auto">

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


