import "dotenv/config"
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import { Keypair } from "@solana/web3.js";

const keypair = getKeypairFromEnvironment("SECRET_KEY");
console.log(`✅ Finished! We've loaded our secret key securely, using an env file!`);
console.log(keypair.publicKey.toBase58())

/** Random */
const keyPairRandom = Keypair.generate()
console.log(`✅ Random! ${keyPairRandom.publicKey.toBase58()}`, keyPairRandom.secretKey);
