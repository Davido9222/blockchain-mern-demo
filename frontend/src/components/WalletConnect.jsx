import React from "react";
import { TOKEN_SYMBOL, NETWORK_NAME } from "../config";

export function WalletConnect({ account, onConnect, balance, loading }) {
  const shortAddress = account
    ? `${account.slice(0, 6)}...${account.slice(-4)}`
    : null;

  return (
    <div className="app-header">
      <div>
        <div className="badge">Blockchain Payment Demo</div>
        <h1 className="app-title">Web3 Checkout for Marketplace</h1>
        <p className="app-subtitle">
          Wallet-based login, crypto checkout, and optional NFT receipts
          for each purchase.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", alignItems: "flex-end" }}>
        <div className="wallet-pill">
          <span className="wallet-pill-label">Network</span>
          <span className="wallet-pill-value">{NETWORK_NAME}</span>
        </div>

        {account ? (
          <>
            <div className="wallet-pill">
              <span className="wallet-pill-label">Wallet</span>
              <span className="wallet-pill-value">{shortAddress}</span>
            </div>
            <div className="wallet-pill">
              <span className="wallet-pill-label">Balance</span>
              <span className="wallet-pill-value">
                {balance != null ? `${balance} ${TOKEN_SYMBOL}` : "..."}
              </span>
            </div>
          </>
        ) : (
          <button
            className="primary-btn"
            onClick={onConnect}
            disabled={loading}
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </button>
        )}
      </div>
    </div>
  );
}
