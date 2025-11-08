'use client';

import { usePathname } from 'next/navigation';

export default function AdminLayoutWrapper({
  children,
  blobController,
}: {
  children: React.ReactNode;
  blobController: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && blobController}
      {children}
    </>
  );
}

