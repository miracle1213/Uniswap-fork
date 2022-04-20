// Set of helper functions to facilitate wallet setup
import { ethers } from "ethers";
import { RinkebyNetInfo } from "../Config/Constants";

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
declare let window: any;

export const switchNetwork = async () => {
  const provider = window.ethereum;
  if (provider) {
    const currentChainId = await provider.request({ method: "eth_chainId" });

    if (currentChainId === `0x${RinkebyNetInfo.chainId.toString(16)}`) {
      console.log("You are on the correct network");
      return true;
    } else {
      console.log("Switching network to velas network");
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${RinkebyNetInfo.chainId.toString(16)}` }],
        });

        console.log(
          `You have successfully switched to ${RinkebyNetInfo.chainName}`
        );
        return true;
      } catch (error: any) {
        if (error.code === 4902) {
          console.log(
            "This network is not available in your metamask, please add it"
          );

          try {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${RinkebyNetInfo.chainId.toString(16)}`,
                  chainName: RinkebyNetInfo.chainName,
                  rpcUrls: [RinkebyNetInfo.rpcUrl],
                  blockExplorerUrls: ["https://testnet.bscscan.com"],
                  nativeCurrency: {
                    symbol: "VLX", // 2-6 characters long
                    decimals: 18,
                  },
                },
              ],
            });

            console.log(`${RinkebyNetInfo.chainName} is successfully added`);

            return true;
          } catch (error) {
            console.log("Adding network to metamask error: ", error);
            return false;
          }
        } else {
          console.log("Switching ethereum chain error: ", error.message);
          return false;
        }
      }
    }
  } else {
    console.log("Metamask is not installed, please install!");
    return false;
  }
};
 