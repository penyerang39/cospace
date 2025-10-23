// TinaCMS Disabled - Fallback page
export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="heading-2 mb-4">TinaCMS Disabled</h1>
        <p className="body-text text-muted">
          TinaCMS is temporarily disabled for debugging.
        </p>
        <p className="body-text text-muted mt-2">
          Run: <code>node scripts/toggle-tinacms.js enable</code>
        </p>
      </div>
    </div>
  );
}