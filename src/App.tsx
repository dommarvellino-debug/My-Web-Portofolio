import { useState } from "react"

import { LandingPage } from "@/components/landing-page"
import SkeletonKeyPreloader from "@/components/ui/skeleton-key-preloader"

export default function App() {
  const [revealed, setRevealed] = useState(false)

  return (
    <SkeletonKeyPreloader
      durationMs={5400}
      unlock="auto"
      greeting="welcome to my"
      word="portfolio"
      tags={["#2kMarvin", "#AI", "#bigdata", "#motion"]}
      name="Dominikus Marvellino"
      aboutLabel="about/"
      about={[
        "AI & Big Data undergrad",
        "viral sports video editor",
        "building data-driven stories.",
      ]}
      links={["linkedin.com/in/dominikus-marvellino", "tiktok.com/@2kMarvin"]}
      signature="marvellino"
      release="2026"
      metal="gold"
      paper="transparent"
      ink="#e3e2e6"
      onComplete={() => setRevealed(true)}
    >
      <LandingPage revealed={revealed} />
    </SkeletonKeyPreloader>
  )
}
