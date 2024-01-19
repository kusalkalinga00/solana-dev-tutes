"use client";
import { PublicKey } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

const MOVIE_REVIEW_PROGRAM_ID = "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

import React, { useEffect, useState } from "react";
import { Movie } from "../models/Movie";
import CardComp from "./CardComp";

const MoviesList: React.FC = () => {
  const { connection } = useConnection();
  const [movies, setMovies] = useState<Movie[]>([]);
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    connection
      .getProgramAccounts(new PublicKey(MOVIE_REVIEW_PROGRAM_ID))
      .then(async (accounts) => {
        const movies: Movie[] | any = accounts.map(({ account }) => {
          return Movie.deserialize(account.data);
        });

        console.log("movies : ", movies);

        setMovies(movies);
      });
  }, []);

  return (
    <div className="h-[400px] overflow-y-auto">
      <h1>Reviews by users</h1>
      {movies.map((movie, i) => (
        <div key={i}>
          <CardComp title={movie.title} description={movie.description} />
        </div>
      ))}
    </div>
  );
};

export default MoviesList;
