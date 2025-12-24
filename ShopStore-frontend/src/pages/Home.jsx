import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import * as api from "../services/api";

export default function Home({ onAdd, onAddToWishlist, user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    api
      .getProducts({ premiumOnly: true, sortBy: "-avgRating" })
      .then((res) => {
        if (!mounted) return;
        if (res.ok && Array.isArray(res.data?.products))
          setProducts(res.data.products);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  const firstName = user?.name ? user.name.split(" ")[0] : "";

  return (
    <div className="home-wrapper">
      {/* Desktop Hero Section */}
      <motion.div
        className="header-hero-class hero-desktop"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="hero-text-content">
          <h1 className="hero-title">
            Welcome back{firstName ? `, ${firstName}` : ""} <br />
            <span>discover colorful picks</span>
          </h1>
          <p className="hero-sub">
            Shop playful, durable gear with smooth motion and bright hues.
            Premium quality for SwiftCart explorers.
          </p>
        </div>
      </motion.div>

      {/* Mobile Hero Section */}
      <motion.div
        className="hero-mobile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="hero-mobile-content">
          <h1 className="hero-mobile-title">
            Welcome back{firstName ? `, ${firstName}` : ""}!
          </h1>
          <p className="hero-mobile-sub">
            Discover colorful picks and premium gear
          </p>
        </div>
      </motion.div>

      {/* Product Grid Section */}
      <section className="product-section">
        <div className="section-header">
          <h3 className="section-title">Premium products</h3>
          <a href="/shop" className="text-link">
            See all →
          </a>
        </div>

        <div className="grid">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductCard key={`ph-${i}`} loading={true} />
              ))
            : products
                .slice(0, 8)
                .map((p) => (
                  <ProductCard
                    key={p._id}
                    product={p}
                    onAdd={onAdd}
                    onAddToWishlist={onAddToWishlist}
                  />
                ))}
        </div>
      </section>
    </div>
  );
}
