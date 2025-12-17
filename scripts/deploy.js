const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deploying with:", deployer.address);

    const MarketplacePayments = await hre.ethers.getContractFactory("MarketplacePayments");

    // Treasury = deployer for demo
    const contract = await MarketplacePayments.deploy(deployer.address);
    await contract.deployed();

    console.log("MarketplacePayments deployed to:", contract.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});