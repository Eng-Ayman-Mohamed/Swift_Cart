import React from "react";

export default function AddProductForm({
  formData,
  handleChange,
  handleSubmit,
  loading,
  onClearForm,
}) {
  return (
    <div className="card form admin-form">
      <h2>Add New Product</h2>

      <form onSubmit={handleSubmit}>
        <div className="admin-form-group">
          <label htmlFor="title">Product Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Aurora Sneakers"
            disabled={loading}
            required
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="price">Price ($) *</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 89.99"
            step="0.01"
            min="0"
            disabled={loading}
            required
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g., Lightweight, responsive sneakers with a vibrant gradient finish for everyday comfort."
            rows="3"
            disabled={loading}
            required
          />
        </div>

        <div className="admin-form-group">
          <label htmlFor="img">Image URL *</label>
          <input
            type="url"
            id="img"
            name="img"
            value={formData.img}
            onChange={handleChange}
            placeholder="e.g., https://example.com/image.jpg"
            disabled={loading}
            required
          />
          {formData.img && (
            <div className="image-preview">
              <p className="small">Preview:</p>
              <img
                src={formData.img}
                alt="Preview"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        <div className="admin-form-buttons">
          <button type="submit" className="btn primary" disabled={loading}>
            {loading ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 14,
                    height: 14,
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    animation: "spin 0.8s linear infinite",
                  }}
                />
                Adding...
              </span>
            ) : (
              "Add Product"
            )}
          </button>
          <button
            type="button"
            onClick={onClearForm}
            className="btn"
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
