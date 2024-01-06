'use client'

import { AspectRatio } from "../ui/aspect-ratio"
import Image from "next/image"

import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { images } from "@/lib/images"

export default function ImageGallery() {
  return (
    <Carousel className="">
      <CarouselContent className="-ml-1">
        {images.map(img => (
          <CarouselItem key={img.alt} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
            <AspectRatio ratio={img.aspect} className="">
             <Image src={img.src} alt={img.alt} fill className="rounded-md object-cover"/>
            </AspectRatio>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
