"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/routing";
import { Post } from "@prisma/client";

interface Props {
  posts: Post[];
}

// TODO: Convert to server component and add the query here, also wrap it in a Suspense
export default function Carrousel({ posts }: Props) {
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
        <Link
          href={`/posts/${post.slug}`}
          key={post.slug}
          style={{
            backgroundImage: `url(${post.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            pointerEvents: currentSlide === index ? "auto" : "none",
          }}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute left-16 bg-black bg-opacity-50 p-8 min-w-min max-w-md h-full text-white">
            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold"
              dangerouslySetInnerHTML={{
                __html: post.title
                  .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
                  .replace(/\*\*(.*?)\*\*/g, "<em>$1</em>"),
              }}
            />
            <p className="text-sm my-4">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
            <p
              className="text-base overflow-hidden text-ellipsis line-clamp-6"
              dangerouslySetInnerHTML={{
                __html: post.excerpt
                  .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
                  .replace(/\*\*(.*?)\*\*/g, "<em>$1</em>"),
              }}
            />
          </div>
        </Link>
      ))}

      {/* TODO: Move buttons to a new client component and import it here */}
      <button
        className="absolute left-0 top-1/2 transform h-36 -translate-y-1/2 bg-gray-700 text-white px-4 py-3 opacity-60"
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1))
        }
      >
        {"<-"}
      </button>

      <button
        className="absolute right-0 top-1/2 transform h-36 -translate-y-1/2 bg-gray-700 text-white px-4 py-3 opacity-60"
        onClick={() =>
          setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
        }
      >
        {"->"}
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {posts.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full ${
              currentSlide === index ? "bg-white" : "bg-gray-500"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}
