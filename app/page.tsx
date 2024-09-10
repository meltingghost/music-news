import React from "react";
import Container from "@/app/components/container";
import { Intro } from "@/app/components/intro";
import MusicNews from "./components/results";

export default function Index() {
  return (
    <main>
      <Container>
        <Intro />
        <MusicNews />
      </Container>
    </main>
  );
}
