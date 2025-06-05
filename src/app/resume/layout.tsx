export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <h1>Donde me renderizo?</h1>
        {children}
    </>
  );
}
