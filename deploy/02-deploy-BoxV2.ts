import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import "dotenv/config";
import verify from "../utils/verify";

const deployBoxV2: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, network, getNamedAccounts } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId!;

    const waitConfirmations = networkConfig[chainId].blockConfirmations;

    log("------------------------------------------");

    const boxV2 = await deploy("BoxV2", {
        contract: "BoxV2",
        from: deployer,
        log: true,
        args: [],
        waitConfirmations: waitConfirmations,
    });

    log("BoxV2 upgraded ...");

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying contract ...");
        await verify(boxV2.address, []);
    }

    log("-----------------------------------------");
};

export default deployBoxV2;
deployBoxV2.tags = ["all", "boxV2"];
