import Link from 'next/link';
import { getNavigation, type MenuGroup } from '../lib/navigation';

export default function Footer() {
  const navigation = getNavigation();
  const currentYear = new Date().getFullYear();

  // Separate groups with and without children for better layout
  const groupsWithChildren = navigation.filter(group => group.items && group.items.length > 0);
  const groupsWithoutChildren = navigation.filter(group => !group.items || group.items.length === 0);

  return (
    <footer className="bg-accent text-white relative">
      <div className="max-width container-padding py-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          {/* Links organized by sections - dynamic flex layout that compresses */}
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {/* Groups without children - just the main link */}
            {groupsWithoutChildren.map((group: MenuGroup) => (
              <div key={group.label} className="space-y-1 min-w-0 flex-shrink-0">
                <h4 className="font-medium text-white text-xs uppercase tracking-wide">
                  {group.label}
                </h4>
                <ul className="space-y-1">
                  <li>
                    <Link 
                      href={group.href || '#'}
                      className="text-white/70 hover:text-white/90 transition-colors text-xs"
                    >
                      {group.label}
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
            
            {/* Groups with children */}
            {groupsWithChildren.map((group: MenuGroup) => (
              <div key={group.label} className="space-y-1 min-w-0 flex-shrink-0">
                <h4 className="font-medium text-white text-xs uppercase tracking-wide">
                  {group.label}
                </h4>
                <ul className="space-y-1">
                  {group.href && (
                    <li>
                      <Link 
                        href={group.href}
                        className="text-white/70 hover:text-white/90 transition-colors text-xs"
                      >
                        {group.label}
                      </Link>
                    </li>
                  )}
                  {group.items && group.items.map((item) => (
                    <li key={item.href}>
                      <Link 
                        href={item.href}
                        className="text-white/70 hover:text-white/90 transition-colors text-xs"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Copyright on the right for desktop */}
          <div className="lg:text-right lg:flex-shrink-0">
            <p className="text-white/70 text-xs">
              © {currentYear} Neo14 Technologies, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      {/* Large watermark text */}
      <div className=" w-full overflow-hidden pointer-events-none">
        <div className="text-[20vw] font-black text-white/5 leading-none select-none transform translate-y-1/2">
        COSPACE
        </div>
      </div>
    </footer>
  );
}
