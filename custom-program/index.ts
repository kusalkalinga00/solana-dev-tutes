import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  TransactionInstruction,
} from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/node-helpers";

const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(`The payer key is: `, keypair.publicKey.toBase58());

//const payer = keypair.publicKey.toBase58();
const PING_PROGRAM_ADDRESS = new PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
);
const PING_PROGRAM_DATA_ADDRESS = new PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`✅ Connected!`);

const sendPingTransaction = async (connection: Connection, payer: Keypair) => {
  const transaction = new Transaction();
  const programId = new PublicKey(PING_PROGRAM_ADDRESS);
  const pingProgramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS);

  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: pingProgramDataId,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
  });

  transaction.add(instruction);

  const signature = await sendAndConfirmTransaction(connection, transaction, [
    payer,
  ]);

  console.log(`✅ Transaction completed! Signature is ${signature}`);
};

sendPingTransaction(connection, keypair);
