import { About } from "@/components/home/About";
import { Contact } from "@/components/home/Contact";
import { Experience } from "@/components/home/Experience";
import { Expertise } from "@/components/home/Expertise";
import { Hero } from "@/components/home/Hero";
import { Work } from "@/components/home/Work";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Experience />
      <Expertise />
      <About />
      <Contact />
    </>
  );
}
