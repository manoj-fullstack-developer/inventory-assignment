import Navbar from "../components/shared/navbar";

export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen ">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
