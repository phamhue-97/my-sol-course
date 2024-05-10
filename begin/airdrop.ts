import {
    LAMPORTS_PER_SOL,
    PublicKey,
    Connection
} from "@solana/web3.js";
const connection = new Connection("https://api.devnet.solana.com", "confirmed");
import "dotenv/config"
import { airdropIfRequired, getKeypairFromFile } from "@solana-developers/helpers";

// @ts-ignore
const keypair = await getKeypairFromFile("./wallet-keypair.json");
console.log("Airdrop...")
try {
    // @ts-ignore
    const rs = await airdropIfRequired(
        connection,
        new PublicKey(keypair.publicKey),
        LAMPORTS_PER_SOL,
        0.5 * LAMPORTS_PER_SOL
    )
    console.log("Result airdrop: ", rs)
} catch (e) {
    console.error("Error: ", e)
}