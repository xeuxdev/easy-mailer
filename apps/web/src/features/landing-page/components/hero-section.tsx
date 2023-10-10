import { Button } from "@/components/ui/button"
import Link from "next/link"

function HeroSection() {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center px-5 py-40 text-center lg:py-0 lg:min-h-screen"
    >
      <h1 className="font-bold text-2xl md:text-3xl lg:text-6xl [text-wrap:balance]">
        Simplify Your Email Experience: EasyMailer Ensures Seamless
        Communication!
      </h1>

      <p className="my-8 text-lg">
        EasyMailer helps you skip the hassle of configuration {"–"} saving you
        time and effort!
      </p>
      <Button>
        <Link href={"/auth"}>Get Started</Link>
      </Button>
    </section>
  )
}

export default HeroSection
