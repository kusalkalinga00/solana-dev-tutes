import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`The public key is: `, keypair.publicKey.toBase58());

const publicKey = keypair.publicKey.toBase58();

const connection = new Connection(clusterApiUrl("devnet"));
const address = new PublicKey(publicKey);
const balance = await connection.getBalance(address);
const balanceInSol = balance / LAMPORTS_PER_SOL;

console.log(`✅ Connected!`);
console.log(
  `The balance of the account at ${address} is ${balanceInSol} sol .`
);

const suppliedToPubkey = "4xvPpevvNFZLRnqB1qjFBpWDGVP2swh8sBrVYa7wnsxQ";
const toPubkey = new PublicKey(suppliedToPubkey);

const transaction = new Transaction();

const LAMPORTS_TO_SEND = 5000;

const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: keypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

transaction.add(sendSolInstruction);

const signature = await sendAndConfirmTransaction(connection, transaction, [
  keypair,
]);

console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`Transaction signature is ${signature}!`);

//The balance returned is in lamports, Web3.js provides the constant LAMPORTS_PER_SOL for showing Lamports as SOL
