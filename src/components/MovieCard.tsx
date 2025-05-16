// components/MovieCard.tsx
"use client";

import Image from "next/image";

interface MovieCardProps {
  _id: string;
  title: string;
  description: string;
  image: string;
  status: string;
}

export default function MovieCard({
  title,
  description,
  image,
  status,
}: MovieCardProps) {
  // Map status to badge color
  const statusColors: Record<MovieCardProps["status"], string> = {
    Finished: "bg-green-100 text-green-800",
    Airing: "bg-blue-100 text-blue-800",
    "Not Yet Airing": "bg-yellow-100 text-yellow-800",
  };

  return (
    <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, 400px"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
          {description}
        </p>
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColors[status]}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}
