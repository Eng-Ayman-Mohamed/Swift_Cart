import React from "react";
import { motion } from "framer-motion";

export default function ProductCardAdmin({ product, onDelete }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        border: "1px solid var(--card-border)",
        borderRadius: 8,
        padding: 15,
        position: "relative",
      }}
    >
      <img
        src={product.img}
        alt={product.title}
        style={{
          width: "100%",
          height: 150,
          objectFit: "cover",
          borderRadius: 6,
          marginBottom: 10,
        }}
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />

      <h4 style={{ margin: "5px 0", fontSize: 16 }}>{product.title}</h4>

      <p
        style={{
          margin: "5px 0",
          fontSize: 18,
          fontWeight: "bold",
          color: "var(--primary)",
        }}
      >
        ${product.price?.toFixed(2)}
      </p>

      <p
        style={{
          margin: "5px 0",
          fontSize: 12,
          color: "var(--text-secondary)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.description}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>
          ⭐ {product.avgRating?.toFixed(1) || "0.0"}
        </span>

        <button
          onClick={() => onDelete(product._id, product.title)}
          style={{
            padding: "5px 10px",
            borderRadius: 4,
            border: "1px solid #e74c3c",
            background: "none",
            color: "#e74c3c",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
