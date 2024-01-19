import React from "react";
import ReviewAddForm from "../components/ReviewAddForm";
import MoviesList from "../components/MoviesList";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <ReviewAddForm />

      <div className="mt-10">
        <MoviesList />
      </div>
    </div>
  );
};

export default HomePage;
