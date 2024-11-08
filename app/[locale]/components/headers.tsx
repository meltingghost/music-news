"use client";

import { useRandomGradient } from "@/app/hooks/useRandomGradient";

export function NewsHeader() {
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">News</h1>
        <h2 className="text-center text-2xl text-slate-100">
          What a time to be alive
        </h2>
      </div>
    </section>
  );
}

export function ReviewsHeader() {
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">Reviews</h1>
        <h2 className="text-center text-2xl text-slate-100">
          We are all a little opinionated
        </h2>
      </div>
    </section>
  );
}

export function ReleasesHeader() {
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">New Releases</h1>
        <h2 className="text-center text-2xl text-slate-100">Everything new</h2>
      </div>
    </section>
  );
}

export function MiscHeader() {
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">Miscelaneous</h1>
        <h2 className="text-center text-2xl text-slate-100">
          Something for everybody
        </h2>
      </div>
    </section>
  );
}

export function FeaturesHeader() {
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">Features</h1>
        <h2 className="text-center text-2xl text-slate-100">
          Up to date information on our culture
        </h2>
      </div>
    </section>
  );
}

export function ListsHeader() {
  const gradient = useRandomGradient();

  return (
    <section className="w-full h-48" style={{ backgroundImage: gradient }}>
      <div className="py-9 text-white">
        <h1 className="text-center text-6xl text-slate-100">Lists</h1>
        <h2 className="text-center text-2xl text-slate-100">
          All things that matter put together
        </h2>
      </div>
    </section>
  );
}
