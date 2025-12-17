// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MarketplacePayments is ERC721, Ownable {
    struct PaymentInfo {
        address buyer;
        uint256 productId;
        uint256 amount;      // in wei
        bool mintedNft;
        uint256 tokenId;     // 0 if no NFT
        uint256 timestamp;
    }

    uint256 public nextTokenId;
    address public treasury; // where funds go

    event PaymentReceived(
        address indexed buyer,
        uint256 indexed productId,
        uint256 amount,
        bool mintedNft,
        uint256 tokenId,
        uint256 timestamp
    );

    constructor(address _treasury)
        ERC721("MarketplaceReceipt", "MPREC")
        Ownable(msg.sender)
    {
        require(_treasury != address(0), "Invalid treasury");
        treasury = _treasury;
    }

    function setTreasury(address _treasury) external onlyOwner {
        require(_treasury != address(0), "Invalid treasury");
        treasury = _treasury;
    }

    /// @notice Pay for a product. Optionally mint an NFT receipt.
    /// @param productId Product identifier from frontend
    /// @param mintNft Whether to mint NFT receipt
    function payForProduct(uint256 productId, bool mintNft) external payable {
        require(msg.value > 0, "No value sent");
        require(productId > 0, "Invalid productId");

        // Forward funds to treasury
        (bool sent, ) = treasury.call{value: msg.value}("");
        require(sent, "Treasury transfer failed");

        uint256 tokenId = 0;
        if (mintNft) {
            tokenId = ++nextTokenId;
            _safeMint(msg.sender, tokenId);
        }

        emit PaymentReceived(
            msg.sender,
            productId,
            msg.value,
            mintNft,
            tokenId,
            block.timestamp
        );
    }
}
