import React from "react";
import { TOKEN_SYMBOL } from "../config";

export function ProductCard({ product, selected, onSelect }) {
  return (
    <div
      className={`product-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(product)}
    >
      <div className="product-name">{product.name}</div>
      <div className="product-meta">{product.category}</div>
      <div className="product-price">
        {product.price} {TOKEN_SYMBOL}
      </div>
      <div className="product-tag">{product.tag}</div>
    </div>
  );
}
