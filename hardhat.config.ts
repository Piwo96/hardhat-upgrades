import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "dotenv/config";

const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://example";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0x00";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";

const config: HardhatUserConfig = {
    solidity: {
        compilers: [{ version: "0.8.7" }],
    },
    defaultNetwork: "hardhat",
    networks: {
        localhost: {
            chainId: 31337,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            chainId: 5,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    mocha: {
        timeout: 500000,
    },
};

export default config;
