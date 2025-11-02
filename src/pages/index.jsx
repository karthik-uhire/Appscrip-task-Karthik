 
import Head from "next/head";
import ProductCard from "../components/ProductCard";

export default function Home({ products }) {
  const siteTitle = "Minimal Store - SSR Demo";
  const description =
    "Minimal SSR demo using Next.js and FakeStoreAPI - accessible, responsive, and SEO-friendly.";

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: siteTitle,
    description,
    url: "https://your-deployed-url.netlify.app",
    publisher: {
      "@type": "Organization",
      name: "Appscrip-task-Karthik"
    }
  };

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://your-deployed-url.netlify.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </Head>

      <main className="container">
        <header className="hero">
          <h1>Minimal Store</h1>
          <h2>Server-side Rendered Product Listing (FakeStore API)</h2>
        </header>

        <section className="grid" aria-label="Product listing">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </section>

        <footer className="footer">
          <p>Built with Next.js • SSR • Plain CSS</p>
        </footer>
      </main>
    </>
  );
}

 /* ✅ SSR function with fallback data when API is unavailable */
export async function getServerSideProps() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("API not reachable");

    const products = await res.json();

    const safeProducts = products.map((p) => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.image,
      description: p.description,
    }));

    return { props: { products: safeProducts } };
  } 
  catch (error) 
  {
    console.error("⚠️ Error fetching products:", error.message);

      
const fallbackProducts = [
      {
        id: 1,
        title: "Fallback Product 1",
        price: 99,
        image: "/placeholder.png",
        description: "Temporary product due to API issue.",
      },
      {
        id: 2,
        title: "Fallback Product 2",
        price: 149,
        image: "/placeholder.png",
        description: "Temporary product due to API issue.",
      },
    ];

    return { props: { products: fallbackProducts } };
  }
}
 
 
  