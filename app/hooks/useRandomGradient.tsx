"use client";
import { useEffect, useState } from "react";

export function useRandomGradient() {
  const [gradient, setGradient] = useState<string>("");

  function getRandomColor(): string {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function applyRandomGradient(): void {
    const randomColor1 = getRandomColor();
    const randomColor2 = getRandomColor();
    const randomColor3 = getRandomColor();

    setGradient(
      `linear-gradient(to right, ${randomColor1}, ${randomColor2}, ${randomColor3})`
    );
  }

  useEffect(() => {
    applyRandomGradient();
  }, []);

  return gradient;
}
