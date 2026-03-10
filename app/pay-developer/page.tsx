import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Your Developer",
  robots: { index: false, follow: false },
};

export default function PayDeveloperPage() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: "#fff",
        background: "url('/pay-me.jpg') center / cover no-repeat",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: "0 0 0.5rem" }}>
          Pay Your Developer
        </h1>
        <p style={{ fontSize: "5rem", fontWeight: 800, margin: "1rem 0", color: "#fff" }}>
          €700
        </p>
        <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", margin: 0 }}>
          Once payment is confirmed, your site will be restored to normal.
        </p>
      </div>
    </div>
  );
}
