import { transfer, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import { getKeypairFromFile } from "@solana-developers/helpers";
const connection = new Connection(
    clusterApiUrl('devnet'),
    'confirmed'
);
// @ts-ignore
const payer = await getKeypairFromFile("./wallet-keypair.json");
// @ts-ignore
const toWallet = await getKeypairFromFile("./recipient.json");

const mint = new PublicKey('CdZrjH5h5Zpx7hDBCaBCrYfokbMm63fog536afze1aoy')

// Get the token account of the fromWallet address, and if it does not exist, create it
// @ts-ignore
const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
);

// Get the token account of the toWallet address, and if it does not exist, create it
// @ts-ignore
const toTokenAccount = await getOrCreateAssociatedTokenAccount(connection, payer, mint, toWallet.publicKey);

// @ts-ignore
const sig = await transfer(
    connection,
    payer,
    fromTokenAccount.address,
    toTokenAccount.address,
    payer.publicKey,
    Math.pow(10, 9) * 5
);
console.log('sig: ', sig)