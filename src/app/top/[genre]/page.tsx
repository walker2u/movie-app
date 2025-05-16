"use client";

import React, { useState, use, useEffect } from "react";
import MovieCard from "../../../components/MovieCard";
import { useParams } from "next/navigation";

interface MovieCardProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
}

function TopPages() {
  const [movies, setMovies] = useState<MovieCardProps[]>([]);
  const params = useParams<{ genre: string }>();

  console.log(movies);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const host = process.env.NEXT_PUBLIC_RAPID_API_HOST;
        const key = process.env.NEXT_PUBLIC_RAPID_API_KEY;
        const url = `https://${host}/anime?page=1&size=12&sortBy=ranking&sortOrder=asc`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-key": key,
            "x-rapidapi-host": host,
          },
        });
        const res = await response.json();
        setMovies(res.data);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-10 m-4">
      {movies.map((movie) => (
        <div key={movie._id}>
          <MovieCard
            _id={movie._id}
            key={movie.title}
            title={movie.title}
            description={movie.description}
            image={movie.image}
            status={movie.status}
          />
        </div>
      ))}
    </div>
  );
}

export default TopPages;
