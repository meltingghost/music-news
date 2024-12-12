"use client";

import { useState, useEffect } from "react";
import { Post } from "@prisma/client";
import {
  CarrouselPosts,
  SlideIndicator,
  ButtonLeft,
  ButtonRight,
} from "@/app/[locale]/components/carrousel-logic";

type carrouselPosts = {
  posts: Post[];
  totalPosts: number;
};

type CarrouselLogicWrapperProps = {
  carrouselPosts: carrouselPosts;
};

export default function CarrouselLogicWrapper({
  carrouselPosts,
}: CarrouselLogicWrapperProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev: number) =>
        prev === carrouselPosts.posts.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide, carrouselPosts.posts.length]);

  return (
    <section className="relative w-screen h-[80vh] overflow-hidden">
      {carrouselPosts.posts.map((post, index) => (
        <CarrouselPosts
          key={post.id}
          post={post}
          index={index}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
      ))}
      <ButtonLeft
        totalSlides={carrouselPosts.posts.length}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      <ButtonRight
        totalSlides={carrouselPosts.posts.length}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      <SlideIndicator
        posts={carrouselPosts.posts}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </section>
  );
}
