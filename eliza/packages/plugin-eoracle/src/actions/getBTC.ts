import { ethers } from 'ethers'; // Import ethers
import {
    Action,
    type IAgentRuntime,
    type Memory,
    type State,
    HandlerCallback,
    elizaLogger,
} from "@elizaos/core";

import EORACLE_ABI from "../abi/interface_abi.json";

// EOracle documentation
// https://docs.eoracle.io/docs/eoracle-price-feeds/integration-guide

const EORACLE_CONTRACT_ADDRESS = '0xDD8387185C9e0a173702fc4a3285FA576141A9cd';

const provider = new ethers.JsonRpcProvider('https://holesky.drpc.org');
const eoracleContract = new ethers.Contract(EORACLE_CONTRACT_ADDRESS, EORACLE_ABI, provider);


function fetchBtcPrice() {
    try {
        // Get BTC/USD price data from eoracle
        const data = await eoracleContract.latestRoundData();
        const decimals = await eoracleContract.decimals();

        const priceData = data[1];
        const price = parseFloat(ethers.formatUnits(priceData, decimals));
        
        return price;
    } catch (error) {
        console.error('Error fetching BTC price:', error);
        return null;
    }
}

export const EORACLE_GET_BTC_PRICE: Action = {
    name: "Get BTC Price",
    similes: ["Get BTC price"],
    description: "This fetch the price from eoracle",
    validate: async (runtime: IAgentRuntime, message: Memory) => { return true },
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        options?: any,
        callback?: HandlerCallback
    ) => {

        elizaLogger.log(`Fetching BTC price...`);

        try {
            const price = await fetchBtcPrice();
            
            if (!price) {
              return eliza.speak("Sorry, I couldn't fetch the Bitcoin price at the moment.");
            }
    
            return eliza.speak(
              `The current Bitcoin price is $${price.toFixed(2)}.`,
              `BTC/USD: $${price.toFixed(2)} (via eoracle)`
            );
        } catch (error) {
            console.error('Price check error:', error);
            return eliza.speak("Having trouble connecting to the price oracle. Please try again later.");
        }
    },
    examples: [
        [
            {
                user: "{{user1}}",
                content: { text: "I'd like to fetch the BTC price" },
            },
        ],
    ],
};


