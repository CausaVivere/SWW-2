import Link from "next/link";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to Our Store</h1>
      <p className="mt-4 text-lg">Discover our range of products</p>
      <Link
        href="/products"
        className="mt-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        View Products
      </Link>
    </main>
  );
}
