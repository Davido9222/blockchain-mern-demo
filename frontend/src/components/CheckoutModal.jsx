import React from "react";

export function CheckoutPanel({
  selectedProduct,
  mintNft,
  setMintNft,
  onPay,
  txHash,
  paying,
  error,
}) {
  if (!selectedProduct) {
    return (
      <div>
        <div className="section-title">Checkout</div>
        <p className="section-caption">
          Select a product on the left to preview a Web3 payment flow.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="section-title">Checkout</div>
      <p className="section-caption">
        You are about to pay with your connected wallet. On confirm,
        MetaMask will show the transaction for you to sign.
      </p>

      <div className="summary-card">
        <div className="summary-row">
          <span className="summary-label">Product</span>
          <span className="summary-value">{selectedProduct.name}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Category</span>
          <span className="summary-value">{selectedProduct.category}</span>
        </div>
        <div className="summary-row">
          <span className="summary-label">Amount</span>
          <span className="summary-value summary-total">
            {selectedProduct.price} ETH
          </span>
        </div>
        <div className="checkbox-row">
          <input
            id="mintNft"
            type="checkbox"
            checked={mintNft}
            onChange={() => setMintNft(!mintNft)}
          />
          <label htmlFor="mintNft">
            Mint NFT receipt on-chain as proof of purchase
          </label>
        </div>
        <div className="badge-pill">
          <span>On-chain transaction logging</span>
        </div>
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.6rem" }}>
        <button
          className="primary-btn"
          onClick={onPay}
          disabled={paying}
        >
          {paying ? "Processing..." : "Pay with Wallet"}
        </button>
        <span className="muted">
          You will be asked to confirm the transaction in MetaMask.
        </span>
      </div>

      {txHash && (
        <div className="tx-box">
          <div style={{ marginBottom: "0.25rem" }}>
            Transaction submitted:
          </div>
          <div>{txHash}</div>
          <div style={{ marginTop: "0.25rem" }}>
            You can paste this into any block explorer for the selected
            testnet.
          </div>
        </div>
      )}

      {error && (
        <div style={{ marginTop: "0.5rem", color: "#f97373", fontSize: "0.8rem" }}>
          {error}
        </div>
      )}
    </div>
  );
}
