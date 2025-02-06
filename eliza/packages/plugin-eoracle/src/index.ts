
import { getBTC } from "./actions/getBTC";

export const eoraclePlugin: Plugin = {
    name: "eoracle",
    description: "EOracle Plugin for Eliza",
    actions: [getBTC],
    evaluators: [],
    providers: [],
};

export default eoraclePlugin;
