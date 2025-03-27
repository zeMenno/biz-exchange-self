"use client"

import { useRef } from "react"
import Image from "next/image"
import { Button } from "~/components/ui/button"
import { ArrowRight, Building, Handshake } from "lucide-react"
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion"

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance])
}

export default function BusinessHero() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Create different parallax effects for each particle
  const y1 = useParallax(scrollYProgress, 100)
  const y2 = useParallax(scrollYProgress, -80)
  const y3 = useParallax(scrollYProgress, 60)
  const y4 = useParallax(scrollYProgress, -50)
  const y5 = useParallax(scrollYProgress, 70)

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 45])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -30])
  const rotate3 = useTransform(scrollYProgress, [0, 1], [-12, 12])
  const rotate4 = useTransform(scrollYProgress, [0, 1], [12, -12])

  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9])
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.1])

  return (
    <section
      ref={containerRef}
      className="w-full px-32 py-12 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-blue-50 to-sky-50"
    >
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            {/* <div className="inline-flex items-center rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 mb-2">
              <Building className="mr-1 h-3.5 w-3.5" />
              <span>Business Growth Platform</span>
            </div> */}
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-slate-900">
              Connect Your Business <span className="text-blue-600">With The Right Buyers</span>
            </h1>
            <p className="max-w-[600px] text-slate-700 md:text-xl">
              Transform your business journey with our playful yet powerful platform that connects sellers with
              qualified buyers. No hassle, just results.
            </p>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="bg-primary ">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-secondary text-primary hover:bg-blue-100">
                Schedule a Demo
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm muted">
              <div className="flex items-center">
                <Handshake className="mr-1 h-4 w-4 primary" />
                <span>Easy to use</span>
              </div>
              <div className="h-1 w-1 rounded-full bg-slate-300" />
              <span>Hard to beat</span>
            </div>
          </div>
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[550px]">
              {/* Animated decorative elements */}
              <motion.div
                className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-sky-300 blur-xl opacity-40 z-0"
                style={{ y: y1, scale: scale1 }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-blue-300 blur-xl opacity-40 z-0"
                style={{ y: y2, scale: scale2 }}
              />

              {/* Main image grid with staggered layout */}
              <div className="relative z-10 grid grid-cols-12 gap-3 p-4">
                {/* Top row */}
                <div className="col-span-7 overflow-hidden rounded-lg shadow-lg bg-white p-1">
                  <Image
                    src="/Corporate Photo 380769.jpg"
                    alt="Business meeting"
                    width={320}
                    height={240}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="col-span-5 overflow-hidden rounded-lg shadow-lg bg-white p-1 translate-y-8">
                  <Image
                    src="/Modern Building Blue Sky.jpg"
                    alt="Business growth"
                    width={220}
                    height={180}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>

                {/* Bottom row */}
                <div className="col-span-5 overflow-hidden rounded-lg shadow-lg bg-white p-1 -translate-y-4">
                  <Image
                    src="/Corporate Blue Photo (1).jpg"
                    alt="Business handshake"
                    width={220}
                    height={180}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
                <div className="col-span-7 overflow-hidden rounded-lg shadow-lg bg-white p-1 translate-y-4">
                  <Image
                    src="/Corporate Blue Photo.jpg"
                    alt="Business growth chart"
                    width={320}
                    height={240}
                    className="h-full w-full object-cover rounded-md"
                  />
                </div>
              </div>

              {/* Animated floating elements */}
              <motion.div
                className="absolute top-1/4 -left-4 w-8 h-8 bg-blue-200 rounded-md z-20 opacity-80"
                style={{ y: y3, rotate: rotate3 }}
              />
              <motion.div
                className="absolute bottom-1/4 -right-4 w-10 h-10 bg-sky-200 rounded-md z-20 opacity-80"
                style={{ y: y4, rotate: rotate4 }}
              />
              <motion.div
                className="absolute top-1/2 right-1/4 w-6 h-6 bg-blue-300 rounded-full z-20 opacity-60"
                style={{ y: y5 }}
              />

              {/* Additional animated particles */}
              <motion.div
                className="absolute top-1/3 left-1/3 w-4 h-4 bg-blue-400 rounded-full z-20 opacity-40"
                style={{
                  y: useParallax(scrollYProgress, 40),
                  scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]),
                }}
              />
              <motion.div
                className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-sky-400 rounded-md z-20 opacity-30"
                style={{
                  y: useParallax(scrollYProgress, -30),
                  rotate: rotate1,
                }}
              />
              <motion.div
                className="absolute top-2/3 left-1/4 w-3 h-3 bg-blue-200 rounded-full z-20 opacity-50"
                style={{
                  y: useParallax(scrollYProgress, 50),
                  scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 0.7]),
                }}
              />
              <motion.div
                className="absolute top-1/4 right-1/3 w-6 h-6 bg-sky-100 rounded-md z-20 opacity-60"
                style={{
                  y: useParallax(scrollYProgress, -45),
                  rotate: rotate2,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

