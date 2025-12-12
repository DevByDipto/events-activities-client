/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { EventCard } from '@/components/shared/EventCard' 
import { EventFilters } from '@/components/shared/EventFilters' 
import { mockSavedEvents } from "../../../utils/mockData"
import { EventFilters as FilterState } from '../../../types/index'
import userInfo from '@/services/user/userInfo'
import allEvents from '@/services/event/allEvents'

export default function ExplorePage() {
  const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

// console.log("user",user);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await userInfo();
      setUser(data);
    };

    fetchUser();
  }, []);

  const [events, setEvent] = useState<any>(null);

// console.log("events",events);

  useEffect(() => {
    const fetcEvent = async () => {
      setIsLoading(true)
      const data = await allEvents();
      setIsLoading(false)
      console.log("data",data);
      
      setEvent(data);
    };

    fetcEvent();
  }, []);

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    eventType: '',
    location: '',
    date: '',
    isFeatured: false,
    timeFilter: 'all',
  })

  const [savedEventIds, setSavedEventIds] = useState<string[]>(
    user
      ? mockSavedEvents
          .filter((se) => se.userId === user.id)
          .map((se) => se.eventId)
      : []
  )

  const filteredEvents = useMemo(() => {
    const now = new Date()
    return events?.filter((event:any) => {
      // Search filter
      if (
        filters.search &&
        !event.name.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false
      }
      // Event type filter
      if (filters.eventType && event.eventType !== filters.eventType) {
        return false
      }
      // Location filter
      if (filters.location && event.location !== filters.location) {
        return false
      }
      // Date filter
      if (filters.date) {
        const filterDate = new Date(filters.date).toDateString()
        const eventDate = new Date(event.dateTime).toDateString()
        if (filterDate !== eventDate) return false
      }
      // Featured filter
      if (filters.isFeatured && !event.isFeatured) {
        return false
      }
      // Time filter
      const eventDate = new Date(event.dateTime)
      if (filters.timeFilter === 'upcoming' && eventDate < now) {
        return false
      }
      if (filters.timeFilter === 'past' && eventDate >= now) {
        return false
      }
      return true
    })
  }, [filters,events])

  const handleClearFilters = () => {
    setFilters({
      search: '',
      eventType: '',
      location: '',
      date: '',
      isFeatured: false,
      timeFilter: 'upcoming',
    })
  }

  const handleSaveEvent = (eventId: string) => {
    setSavedEventIds((prev) => [...prev, eventId])
  }

  const handleUnsaveEvent = (eventId: string) => {
    setSavedEventIds((prev) => prev.filter((id) => id !== eventId))
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Explore Events
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover amazing events happening in your area
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <EventFilters
            filters={filters}
            onChange={setFilters}
            onClear={handleClearFilters}
            eventData={events}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing{' '}
            <span className="font-medium text-foreground">
              {filteredEvents?.length}
            </span>{' '}
            events
          </p>
        </div>

        {/* Events Grid */}
        {
          isLoading && <p className='flex items-center justify-center'>loading...</p>
        }
        {filteredEvents?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents?.map((event:any) => (
              event.isApproved &&
              <EventCard
                key={event?.id}
                event={event}
                isSaved={savedEventIds.includes(event.id)}
                onSave={user ? handleSaveEvent : undefined}
                onUnsave={user ? handleUnsaveEvent : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-xl border border-border">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No events found
            </h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search criteria
            </p>
            <button
              onClick={handleClearFilters}
              className="text-primary font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
