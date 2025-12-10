/* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client'
// import React, { memo, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Users,
  Star,
  ArrowRight,
  Search,
  UserPlus,
  PartyPopper,
  Music,
  Mountain,
  Gamepad2,
  Laptop,
  Utensils,
  Bike,
  Shield,
  Heart,
  Zap,
} from 'lucide-react'
import { Button } from '../../shared/Button'
import { EventCard } from '../../shared/EventCard'
import { mockUsers, mockReviews } from '../../../utils/mockData'
import allEvents from '@/services/event/allEvents'
import userInfo from '@/services/user/userInfo'
import { Event } from '@/types'

export async function HomePage() { 
  // const [events, setEvent] = useState<any>(null);
// console.log("events",events);

  // useEffect(() => {
  //   const fetcEvent = async () => {
      const events = await allEvents();
      const user = await userInfo()
  //     setEvent(data);
  //   };

  //   fetcEvent();
  // }, []);
  const featuredEvents = events?.filter((e:any) => e.isFeatured && e.status === 'OPEN')
    .slice(0, 6)

  const topHosts = mockUsers
    .filter((u) => u.role === 'HOST' && u.rating && u.rating >= 4.5)
    .slice(0, 4)

  const categories = [
    { icon: Music, label: 'Concerts', color: 'bg-purple-100 text-purple-600' },
    { icon: Mountain, label: 'Hiking', color: 'bg-green-100 text-green-600' },
    { icon: Gamepad2, label: 'Gaming', color: 'bg-blue-100 text-blue-600' },
    { icon: Laptop, label: 'Tech Talks', color: 'bg-orange-100 text-orange-600' },
    { icon: Utensils, label: 'Dinners', color: 'bg-red-100 text-red-600' },
    { icon: Bike, label: 'Sports', color: 'bg-cyan-100 text-cyan-600' },
  ]

  const steps = [
    {
      icon: Search,
      title: 'Find Events',
      description:
        'Browse through hundreds of local events based on your interests and location.',
    },
    {
      icon: UserPlus,
      title: 'Join & Connect',
      description:
        'Sign up for events and connect with like-minded people in your community.',
    },
    {
      icon: PartyPopper,
      title: 'Have Fun',
      description:
        'Attend events, make new friends, and create unforgettable memories together.',
    },
  ]

  const benefits = [
    {
      icon: Users,
      title: 'Meet New People',
      description: 'Connect with individuals who share your passions and interests.',
    },
    {
      icon: Shield,
      title: 'Safe & Verified',
      description: 'All hosts are verified and events are reviewed for safety.',
    },
    {
      icon: Heart,
      title: 'Build Community',
      description: 'Foster meaningful relationships and build lasting friendships.',
    },
    {
      icon: Zap,
      title: 'Easy to Use',
      description: 'Simple interface to find, join, and manage your events.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary/5 via-background to-accent/10 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Find Your Perfect
                <span className="text-primary block">Activity Companions</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl">
                Connect with like-minded people for concerts, hiking trips, board game nights, tech meetups, and more. Never miss out on experiences because you donot have someone to go with.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {
                  user.role == "HOST" ?  <Link href="/host/dashboard/creat-events">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Create Event
                  </Button>
                </Link> 
                :
                 <Link href="/explore">
                  <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Find Activities
                  </Button>
                </Link>

                }
               
               
              </div>
              <div className="mt-8 flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold text-foreground">500+</p>
                  <p className="text-sm text-muted-foreground">Active Events</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">10K+</p>
                  <p className="text-sm text-muted-foreground">Happy Users</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">50+</p>
                  <p className="text-sm text-muted-foreground">Cities</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop"
                  alt="Friends hiking"
                  width={400}
                  height={300}
                  className="rounded-2xl shadow-lg"
                />
                <Image
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop"
                  alt="Concert crowd"
                  width={400}
                  height={300}
                  className="rounded-2xl shadow-lg mt-8"
                />
                <Image
                  src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400&h=300&fit=crop"
                  alt="Board game night"
                  width={400}
                  height={300}
                  className="rounded-2xl shadow-lg"
                />
                <Image
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop"
                  alt="Tech meetup"
                  width={400}
                  height={300}
                  className="rounded-2xl shadow-lg mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">How It Works</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Getting started is easy. Find events, connect with people, and start having fun!
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps?.map((step, index) => (
              <div key={step.title} className="relative text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                {/* {
                  index + 1 <= 2 && <div className="absolute top-8 left-1/2 w-full h-0.5 bg-border hidden md:block last:hidden -z-20" />
                } */}
                
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </span>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Featured Events</h2>
              <p className="mt-2 text-muted-foreground">Discover popular events happening near you</p>
            </div>
            <Link href="/explore">
              <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredEvents?.map((event:Event) => (
              <EventCard key={event?.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Event Categories Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Popular Event Categories</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From outdoor adventures to cozy game nights, find events that match your interests
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories?.map((category) => (
              <Link
                key={category.label}
                href={`/explore?type=${category.label.toUpperCase()}`}
                className="group p-6 bg-background rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 text-center"
              >
                <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <p className="font-medium text-foreground">{category.label}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Hosts Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Top-Rated Hosts</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet our communitys most loved event organizers
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topHosts?.map((host) => (
              <Link
                key={host.id}
                href={`#`}
                className="group bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <Image
                  src={host.image || 'https://via.placeholder.com/100'}
                  alt={host.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-background group-hover:ring-primary transition-all"
                />
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{host.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{host.location}</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">{host.rating?.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm">({host.reviewCount} reviews)</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">What Our Users Say</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Real stories from people who found their community through EventHub
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {mockReviews.slice(0, 3)?.map((review) => (
              <div key={review.id} className="bg-background rounded-xl border border-border p-6">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 })?.map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">{review.comment}</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={review.reviewer?.image || 'https://via.placeholder.com/40'}
                    alt={review?.reviewer?.name as string}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-foreground">{review.reviewer?.name}</p>
                    <p className="text-sm text-muted-foreground">{review.reviewer?.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Why Choose EventHub</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We are committed to helping you find meaningful connections through shared experiences
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground">Ready to Find Your Next Adventure?</h2>
          <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of people who are already discovering amazing events and making new friends. Sign up today and start exploring!
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Get Started Free
              </Button>
            </Link>
            <Link href="/explore">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Browse Events
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
