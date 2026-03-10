import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function PayDeveloperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              history.pushState(null, '', window.location.href);
              window.addEventListener('popstate', function() {
                history.pushState(null, '', window.location.href);
              });
            `,
          }}
        />
      </head>
      <body
        className={inter.className}
        style={{ margin: 0, padding: 0, overflow: "hidden" }}
      >
        {children}
      </body>
    </html>
  );
}
