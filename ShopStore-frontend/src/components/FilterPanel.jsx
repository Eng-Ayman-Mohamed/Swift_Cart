import React, { useState } from "react";

export default function FilterPanel({ onFilterChange, onClearFilters }) {
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minRating: "",
    premiumOnly: false,
    sortBy: "price",
  });

  const handleInputChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (sortValue) => {
    const newFilters = { ...filters, sortBy: sortValue };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      minPrice: "",
      maxPrice: "",
      minRating: "",
      premiumOnly: false,
      sortBy: "price",
    };
    setFilters(defaultFilters);
    onClearFilters();
  };

  return (
    <div
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "24px",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            color: "var(--text-primary)",
            fontSize: "16px",
            fontWeight: "700",
            margin: 0,
          }}
        >
          Filter Products
        </h3>
        <button
          onClick={clearFilters}
          style={{
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid var(--card-border)",
            background: "transparent",
            color: "var(--text-secondary)",
            cursor: "pointer",
            fontSize: "13px",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(239, 68, 68, 0.1)";
            e.target.style.color = "var(--accent-pink)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "var(--text-secondary)";
          }}
        >
          Clear All
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
        }}
      >
        {/* Price Range */}
        <div className="field">
          <label
            style={{
              color: "var(--text-secondary)",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            Price Range
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            <div>
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => handleInputChange("minPrice", e.target.value)}
                className="input"
                style={{
                  width: "100%",
                  fontSize: "13px",
                  padding: "10px 12px",
                }}
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => handleInputChange("maxPrice", e.target.value)}
                className="input"
                style={{
                  width: "100%",
                  fontSize: "13px",
                  padding: "10px 12px",
                }}
              />
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="field">
          <label
            style={{
              color: "var(--text-secondary)",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            Minimum Rating
          </label>
          <select
            value={filters.minRating}
            onChange={(e) => handleInputChange("minRating", e.target.value)}
            className="input"
            style={{ fontSize: "13px" }}
          >
            <option value="">Any Rating</option>
            <option value="1">1+ Stars</option>
            <option value="2">2+ Stars</option>
            <option value="3">3+ Stars</option>
            <option value="4">4+ Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        {/* Sort By */}
        <div className="field">
          <label
            style={{
              color: "var(--text-secondary)",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="input"
            style={{ fontSize: "13px" }}
          >
            <option value="price">Price: Low to High</option>
            <option value="-price">Price: High to Low</option>
            <option value="-avgRating">Rating: High to Low</option>
            <option value="avgRating">Rating: Low to High</option>
            <option value="title">Title: A to Z</option>
            <option value="-title">Title: Z to A</option>
          </select>
        </div>

        {/* Premium Filter */}
        <div className="field">
          <label
            style={{
              color: "var(--text-secondary)",
              marginBottom: "8px",
              fontSize: "13px",
            }}
          >
            Product Type
          </label>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              color: "var(--text-primary)",
              fontSize: "13px",
            }}
          >
            <input
              type="checkbox"
              checked={filters.premiumOnly}
              onChange={(e) =>
                handleInputChange("premiumOnly", e.target.checked)
              }
              style={{
                width: "16px",
                height: "16px",
                accentColor: "var(--accent-cyan)",
              }}
            />
            Premium Products Only
          </label>
        </div>
      </div>
    </div>
  );
}
