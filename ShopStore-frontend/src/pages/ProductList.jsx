import React, { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";
import * as api from "../services/api";

export default function ProductList({ onAdd, onAddToWishlist }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  const fetchProducts = useCallback(async (currentFilters = {}) => {
    setLoading(true);
    try {
      const res = await api.getProducts(currentFilters);
      if (res.ok && Array.isArray(res.data?.products)) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    fetchProducts();
    return () => (mounted = false);
  }, [fetchProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    fetchProducts(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    fetchProducts({});
  };

  return (
    <div>
      <h2 style={{ marginTop: 8 }}>All Products</h2>
      <p className="small">
        A colorful selection of items with animated interactions.
      </p>

      <FilterPanel
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="grid" style={{ marginTop: 12 }}>
        {loading ? (
          Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={`ph-${i}`} loading={true} />
          ))
        ) : products.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
              onAdd={onAdd}
              onAddToWishlist={onAddToWishlist}
            />
          ))
        ) : (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "40px",
              color: "var(--text-secondary)",
              fontSize: "16px",
            }}
          >
            {Object.keys(filters).some(
              (key) =>
                filters[key] && filters[key] !== "" && filters[key] !== false
            )
              ? "No products found matching your filters."
              : "No products available."}
          </div>
        )}
      </div>
    </div>
  );
}
