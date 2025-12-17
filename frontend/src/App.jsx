import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import "./styles.css";
import { MARKETPLACE_ABI } from "./abi";
import { CONTRACT_ADDRESS } from "./config";
import { WalletConnect } from "./components/WalletConnect";
import { ProductCard } from "./components/ProductCard";
import { CheckoutPanel } from "./components/CheckoutModal";

const PRODUCTS = [
  {
    id: 1,
    name: "Premium Marketplace Listing",
    category: "Digital Service",
    price: "0.01",
    tag: "Priority exposure",
  },
  {
    id: 2,
    name: "Featured Storefront Badge",
    category: "Subscription",
    price: "0.015",
    tag: "30 days",
  },
  {
    id: 3,
    name: "Instant Order Unlock",
    category: "One-time",
    price: "0.008",
    tag: "Secure checkout",
  },
];

function App() {
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mintNft, setMintNft] = useState(true);
  const [loadingWallet, setLoadingWallet] = useState(false);
  const [paying, setPaying] = useState(false);
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");

  const hasEthereum = typeof window !== "undefined" && window.ethereum;

  const connectWallet = async () => {
    try {
      setLoadingWallet(true);
      setError("");
      if (!hasEthereum) {
        setError("MetaMask not detected. Please install MetaMask.");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error(err);
      setError("User rejected the connection or an error occurred.");
    } finally {
      setLoadingWallet(false);
    }
  };

  const loadBalance = async (acc) => {
    try {
      if (!hasEthereum || !acc) return;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const bal = await provider.getBalance(acc);
      const formatted = Number(ethers.utils.formatEther(bal)).toFixed(4);
      setBalance(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (account) {
      loadBalance(account);
    }
  }, [account]);

  useEffect(() => {
    if (!hasEthereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setBalance(null);
      } else {
        setAccount(accounts[0]);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);

    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [hasEthereum]);

  const handlePay = async () => {
    if (!account) {
      setError("Please connect your wallet first.");
      return;
    }
    if (!selectedProduct) {
      setError("Please select a product.");
      return;
    }
    if (!CONTRACT_ADDRESS || CONTRACT_ADDRESS === "0xYourDeployedContractAddressHere") {
      setError("Contract address is not configured yet. This demo UI is ready; once we deploy the contract to a testnet and paste the address here, payments will be live.");
      return;
    }

    try {
      setPaying(true);
      setError("");
      setTxHash("");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MARKETPLACE_ABI,
        signer
      );

      const value = ethers.utils.parseEther(selectedProduct.price);

      const tx = await contract.payForProduct(
        selectedProduct.id,
        mintNft,
        { value }
      );

      setTxHash(tx.hash);
      await tx.wait();
      await loadBalance(account);
    } catch (err) {
      console.error(err);
      if (err.code === 4001) {
        setError("Transaction rejected in MetaMask.");
      } else {
        setError("Transaction failed. See console for details.");
      }
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="app-root">
      <div className="app-card">
        <div>
          <WalletConnect
            account={account}
            onConnect={connectWallet}
            balance={balance}
            loading={loadingWallet}
          />

          <div>
            <div className="section-title">Marketplace Products</div>
            <p className="section-caption">
              These are example marketplace items. In the real MERN app,
              this list will come from your MongoDB products collection.
            </p>
            <div className="product-grid">
              {PRODUCTS.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  selected={selectedProduct && p.id === selectedProduct.id}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </div>
        </div>

        <CheckoutPanel
          selectedProduct={selectedProduct}
          mintNft={mintNft}
          setMintNft={setMintNft}
          onPay={handlePay}
          txHash={txHash}
          paying={paying}
          error={error}
        />
      </div>
    </div>
  );
}

export default App;
