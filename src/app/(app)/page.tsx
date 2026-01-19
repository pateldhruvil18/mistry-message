"use client"
import {Card, CardContent, CardHeader } from "@/components/ui/card"
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
    <main className='grow flex flex-col items-center justify-center px-4 md:px-24 py-12'>

      <section className='text-center mb-8 md:mb-12'>
        <h1 className='text-3xl md:text-5xl font-bold'>Dive into the World of Anonymous Conversation</h1>
        <p className='mt-3 md:mt-4 text-base'>Explore Mystery Message - Where your identity remains a secret.</p>
      </section>
      <Carousel
      plugins={[Autoplay({delay: 2000})]}
      className="w-full max-w-lg md:max-w-xs">
        <CarouselContent>
          {
            messages.map((message, index) => (
              <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardHeader>
                    {message.title}
                  </CardHeader>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-lg font-semibold">{message.content}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            )) 
          }
        </CarouselContent>
      </Carousel>
       <footer className="text-center p-4 md:p-6">
        2023 Mystery Message. All rights reserved
       </footer>
    </main>
    </>
  )
}

export default Home