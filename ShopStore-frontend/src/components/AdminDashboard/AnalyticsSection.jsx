import React from "react";

export default function AnalyticsSection({ analytics, topProducts, loading }) {
  const renderAnalytics = () => (
    <div className="admin-analytics">
      <div className="analytics-grid">
        <div className="card analytics-card">
          <h3>{analytics?.numProducts || 0}</h3>
          <p>Total Products</p>
        </div>

        <div className="card analytics-card">
          <h3>${analytics?.avgPrice?.toFixed(2) || "0.00"}</h3>
          <p>Average Price</p>
        </div>

        <div className="card analytics-card">
          <h3>{analytics?.avgRating?.toFixed(1) || "0.0"}</h3>
          <p>Average Rating</p>
        </div>

        <div className="card analytics-card">
          <h3>{analytics?.numPremium || 0}</h3>
          <p>Premium Products</p>
        </div>
      </div>

      {topProducts.length > 0 && (
        <div className="card top-products-section">
          <h3>Top Rated Products</h3>
          <div className="top-products-grid">
            {topProducts.slice(0, 6).map((product) => (
              <div key={product._id} className="top-product-card">
                <img
                  src={product.img}
                  alt={product.title}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
                <h4>{product.title}</h4>
                <p>⭐ {product.avgRating?.toFixed(1) || "0.0"}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="analytics-loading">
        <span className="spinner" />
      </div>
    );
  }

  return renderAnalytics();
}
