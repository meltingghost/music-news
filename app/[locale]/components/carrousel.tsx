"use client";

import Post from "@/interfaces/post";
import { useState, useEffect } from "react";

type Props = {
  posts: Post[];
};

export function Carrousel({ posts }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = posts.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <section className="relative w-screen h-[80vh] overflow-hidden">
      {posts.map((post, index) => (
        <div
          key={post.slug}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${post.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute left-16 bg-black bg-opacity-50 p-8 max-w-md text-white">
            <h2 className="text-4xl font-bold">{post.title}</h2>
            <p className="text-sm my-4">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            <p className="text-lg">{post.excerpt}</p>
          </div>
        </div>
      ))}

      <button
        className="absolute left-0 top-1/2 transform h-32 -translate-y-1/2 bg-gray-700 text-white px-3 py-2 opacity-60"
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
        }
      >
        {"<-"}
      </button>

      <button
        className="absolute right-0 top-1/2 transform h-32 -translate-y-1/2 bg-gray-700 text-white px-3 py-2 opacity-60"
        onClick={() =>
          setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
        }
      >
        {"->"}
      </button>
    </section>
  );
}
