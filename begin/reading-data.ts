import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const keypair = getKeypairFromEnvironment("SECRET_KEY");
const address = new PublicKey(keypair.publicKey.toBase58());
// @ts-ignore
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;
console.log(`The balance of the account at ${address} is ${balance} lamports, ${balanceInSol} SOL`);
console.log(`✅ Finished!`)