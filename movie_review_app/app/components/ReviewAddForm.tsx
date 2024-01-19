"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Movie } from "../models/Movie";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Transaction,
  PublicKey,
  TransactionInstruction,
  SystemProgram,
} from "@solana/web3.js";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

const ReviewAddForm = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    console.log("connection : ", connection);
    console.log("publicKey : ", publicKey);
    //console.log("sendTransaction : ", sendTransaction);
  }, [connection, publicKey]);

  const handleSubmit = () => {
    console.log("title", title);
    console.log("rating", rating);
    console.log("message", message);

    const movie = new Movie(title, rating, message);
    console.log("movie : ", movie);
    handleTransactionSubmit(movie);
  };

  const handleTransactionSubmit = async (movie: Movie) => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    const buffer = movie.serialize();

    console.log("buffer : ", buffer);
    const transaction = new Transaction();

    const [pda] = PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), Buffer.from(movie.title)],
      new PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    );

    

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });

    transaction.add(instruction);

    try {
      let txid = await sendTransaction(transaction, connection);
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center space-y-5 mt-5">
      <div className="grid w-full max-w-lg items-center gap-3">
        <Label htmlFor="movieName">Movie Name</Label>
        <Input
          type="text"
          id="movieName"
          placeholder="Name of the movie"
          onChange={(event) => setTitle(event.currentTarget.value)}
        />
      </div>
      <div className="grid w-full max-w-lg items-center gap-3">
        <Label htmlFor="comment">Comment</Label>
        <Input
          type="comment"
          id="comment"
          placeholder="Comment"
          onChange={(event) => setMessage(event.currentTarget.value)}
        />
      </div>
      <div className="grid w-full max-w-lg items-center gap-3">
        <Label htmlFor="rate">Rate</Label>
        <Input
          type="number"
          min={0}
          max={5}
          id="rate"
          placeholder="rate 1-5"
          onChange={(event) => setRating(parseInt(event.currentTarget.value))}
        />
      </div>
      <div>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  );
};

export default ReviewAddForm;
