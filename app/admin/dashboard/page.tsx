import { auth, signOut } from '@/app/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session) {
    redirect('/admin/signin');
  }

  async function handleSignOut() {
    'use server';
    await signOut({ redirectTo: '/' });
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <form action={handleSignOut}>
            <button
              type="submit"
              className="btn-secondary"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="mb-6 p-4 rounded-md border border-border bg-card">
          <p className="text-sm">
            Signed in as: <strong>{session.user?.email}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/dashboard/analytics"
            className="card-feature hover:border-accent"
          >
            <h2 className="text-2xl font-semibold mb-2">Analytics</h2>
            <p className="text-sm opacity-70">
              View website analytics and traffic insights powered by Umami
            </p>
          </Link>

          <div className="card-feature opacity-50">
            <h2 className="text-2xl font-semibold mb-2">CMS</h2>
            <p className="text-sm opacity-70">
              Content Management System (Coming Soon)
            </p>
          </div>

          <div className="card-feature opacity-50">
            <h2 className="text-2xl font-semibold mb-2">Settings</h2>
            <p className="text-sm opacity-70">
              Manage dashboard settings (Coming Soon)
            </p>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              href="/"
              className="btn-ghost inline-block"
            >
              ← Back to Main Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

