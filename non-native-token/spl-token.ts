import { createMint, getMint, getOrCreateAssociatedTokenAccount, getAccount, mintTo } from '@solana/spl-token';
import {clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {getKeypairFromFile} from "@solana-developers/helpers";
// @ts-ignore
const payer = await getKeypairFromFile("./wallet-keypair.json");
// @ts-ignore
const freezeAuthority = await getKeypairFromFile("./recipient.json");

const connection = new Connection(
    clusterApiUrl('devnet'),
    'confirmed'
);
/*const airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    LAMPORTS_PER_SOL,
);

await connection.confirmTransaction(airdropSignature);*/
console.log(payer.publicKey.toBase58())

const mint = new PublicKey('CdZrjH5h5Zpx7hDBCaBCrYfokbMm63fog536afze1aoy')/*await createMint(
    connection,
    payer,
    payer.publicKey,
    freezeAuthority.publicKey,
    9 // We are using 9 to match the CLI decimal default exactly
);*/

console.log(mint.toBase58());

// @ts-ignore
const mintInfo = await getMint(
    connection,
    mint
)

console.log(mintInfo.supply);

// @ts-ignore
const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
)

console.log(tokenAccount.address.toBase58());

// @ts-ignore
const tokenAccountInfo = await getAccount(
  connection,
  tokenAccount.address
)

console.log(tokenAccountInfo.amount);

// @ts-ignore
await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    payer, // mintAuthority
    Math.pow(10, 12) // because decimals for the mint are set to 9
)

