"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import messages from "@/messages.json"

const Home = () => {
  return (
    <>
      <main className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col items-center justify-center px-4 md:px-24 py-12">

        {/* Hero Section */}
        <section className="text-center mb-10 md:mb-14 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-indigo-400 to-pink-500">
            Dive into the World of Anonymous Conversation
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-300">
            Explore Mystery Message — where your identity remains a secret.
          </p>
        </section>

        {/* Carousel */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-sm relative"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="bg-slate-800/70 h-100 border border-slate-700 shadow-xl hover:scale-[1.02] transition-transform duration-300">
                    <CardHeader className="text-center font-semibold text-indigo-400 text-lg">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex aspect-square items-center justify-center p-6 text-center">
                      <span className="text-base md:text-lg font-medium text-slate-200 leading-relaxed">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Optional Controls */}
          <CarouselPrevious className="text-slate-500 border-slate-600 hover:bg-slate-700" />
          <CarouselNext className="text-slate-500 border-slate-600 hover:bg-slate-700" />
        </Carousel>

        {/* Footer */}
        <footer className="mt-14 text-center text-sm text-slate-400">
          © 2023 <span className="font-semibold text-slate-300">Mystery Message</span>. All rights reserved.
        </footer>

      </main>
    </>
  )
}

export default Home
