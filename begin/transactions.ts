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
const keypair = await getKeypairFromFile("./wallet-keypair.json");
const transaction = new Transaction()

const sendSolInstruction = SystemProgram.transfer({
    toPubkey: new PublicKey("3MK2Am1DmW53AhgBbNetHZFKFsu84TYbDbYTcYGBGMTk"),
    fromPubkey: new PublicKey("EJbS9SwWjGqGHkoa2jaKxME5uyjt7AcDgf1G7zcytboV"),
    lamports: LAMPORTS_PER_SOL * 0.64
})
console.log('Add instruction')
transaction.add(sendSolInstruction)

console.log('Wait signature')
// @ts-ignore
const signature = await sendAndConfirmTransaction(connection, transaction, [keypair])
console.log("signature: ", signature)