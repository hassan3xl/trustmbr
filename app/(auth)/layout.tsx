export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Override the main layout for auth pages - no navbar/footer
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {children}
    </div>
  );
}
