import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { networkConfig, developmentChains } from "../helper-hardhat-config";
import verify from "../utils/verify";
import "dotenv/config";

const deployBox: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
    const { deployments, network, getNamedAccounts } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId!;

    const waitConfrimations = networkConfig[chainId].blockConfirmations;

    log("--------------------------------------");
    const box = await deploy("Box", {
        contract: "Box",
        from: deployer,
        log: true,
        waitConfirmations: waitConfrimations,
        args: [],
        proxy: {
            proxyContract: "OpenZeppelinTransparentProxy",
            viaAdminContract: {
                name: "BoxProxyAdmin",
                artifact: "BoxProxyAdmin",
            },
        },
    });

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("Verifying ...");
        await verify(box.address, []);
    }

    log("--------------------------------------");
};

export default deployBox;
deployBox.tags = ["all", "box"];
