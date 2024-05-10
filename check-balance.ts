import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const publicKey = new PublicKey("EJbS9SwWjGqGHkoa2jaKxME5uyjt7AcDgf1G7zcytboV");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// @ts-ignore
const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
    `💰 OK! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
    throw new Error("Provide a public key to check the balance of!");
}

try {
    const publicKey2 = new PublicKey(suppliedPublicKey);

    // @ts-ignore
    const balanceInLamports2 = await connection.getBalance(publicKey2);

    const balanceInSOL2 = balanceInLamports2 / LAMPORTS_PER_SOL;

    console.log(
        `✅ Finished! The balance for the wallet at address ${publicKey2} is ${balanceInSOL2}!`
    );
} catch (e) {
    console.error(`Error: invalid address`)
}
