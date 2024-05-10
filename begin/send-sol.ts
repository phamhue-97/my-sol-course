import {
    LAMPORTS_PER_SOL,
    SystemProgram,
    Transaction,
    PublicKey,
    sendAndConfirmTransaction,
    Connection
} from "@solana/web3.js";
import "dotenv/config"
import { getKeypairFromFile } from "@solana-developers/helpers";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// @ts-ignore
const sender = await getKeypairFromFile("./wallet-keypair.json");

const suppliedToPubkey = process.argv[2] || null;
const amount = process.argv[3] || null;

if (!suppliedToPubkey || !amount) {
    console.log(`Please provide a public key & amount to send to`);
    process.exit(1);
}

console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

const toPubkey = new PublicKey(suppliedToPubkey);

// @ts-ignore
const LAMPORTS_TO_SEND = amount * LAMPORTS_PER_SOL;
const transaction = new Transaction();

const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey,
    lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

// @ts-ignore
const signature = await sendAndConfirmTransaction(connection, transaction, [
    sender,
]);
console.log(
    `💸 Finished! Sent ${LAMPORTS_TO_SEND / LAMPORTS_PER_SOL} SOL to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);