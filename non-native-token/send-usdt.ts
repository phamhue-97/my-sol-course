import {
    TransactionInstruction,
    PublicKey,
    Transaction,
    Connection,
    sendAndConfirmTransaction,
    clusterApiUrl
} from "@solana/web3.js";
import { getKeypairFromFile } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

// @ts-ignore
const sender = await getKeypairFromFile("./wallet-keypair.json");
// @ts-ignore
const recipient = await getKeypairFromFile("./recipient.json");

const instruction = new TransactionInstruction({
    keys: [
        /*{
            pubkey: new PublicKey(sender.publicKey.toBase58()),
            isSigner: true,
            isWritable: true,
        },
        {
            pubkey: new PublicKey(recipient.publicKey.toBase58()),
            isSigner: false,
            isWritable: false,
        },*/
        {
            pubkey: new PublicKey("Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"),
            isSigner: false,
            isWritable: true,
        }
    ],
    // programId: new PublicKey("4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"), // USD Coin
    programId: new PublicKey("ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa")
});

const transaction = new Transaction().add(instruction)
try {
    // @ts-ignore
    const signature = await sendAndConfirmTransaction(
        connection,
        transaction,
        [sender],
    );

    console.log(`✅ Success! Transaction signature is: ${signature}`);
} catch (e) {
    console.error("Error: ", e)
}
