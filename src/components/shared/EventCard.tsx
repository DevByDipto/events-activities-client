'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Star,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react'
import { Event, EVENT_TYPE_LABELS, EVENT_STATUS_LABELS } from '../../types/index'
import { Badge } from './Badge'

interface EventCardProps {
  event: Event
  isSaved?: boolean
  onSave?: (eventId: string) => void
  onUnsave?: (eventId: string) => void
  showHost?: boolean
}

export function EventCard({
  event,
  isSaved = false,
  onSave,
  onUnsave,
  showHost = true,
}: EventCardProps) {
  const statusVariant = {
    OPEN: 'success',
    FULL: 'warning',
    CANCELLED: 'error',
    COMPLETED: 'info',
  } as const

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isSaved && onUnsave) {
      onUnsave(event.id)
    } else if (!isSaved && onSave) {
      onSave(event.id)
    }
  }

  return (
    <Link
      href={`/events/${event.id}`}
      className="group block bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={statusVariant[event.status]} size="sm">
            {EVENT_STATUS_LABELS[event.status]}
          </Badge>
          {event.isFeatured && (
            <Badge variant="warning" size="sm">
              <Star className="w-3 h-3 mr-1" />
              Featured
            </Badge>
          )}
        </div>
        {(onSave || onUnsave) && (
          <button
            onClick={handleSaveClick}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
            aria-label={isSaved ? 'Remove from saved' : 'Save event'}
          >
            {isSaved ? (
              <BookmarkCheck className="w-5 h-5 text-primary" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-600" />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs font-medium text-primary uppercase tracking-wide mb-1">
          {EVENT_TYPE_LABELS[event.eventType]}
        </p>

        <h3 className="text-lg font-semibold text-card-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {event.name}
        </h3>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{formatDate(event.dateTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 flex-shrink-0" />
              <span>
                {event.currentParticipants}/{event.maxParticipants}
              </span>
            </div>
            <div className="flex items-center gap-1 font-medium text-foreground">
              <DollarSign className="w-4 h-4" />
              {event.joiningFee === 0 ? 'Free' : `$${event.joiningFee}`}
            </div>
          </div>
        </div>

        {showHost && event.host && (
          <div className="mt-4 pt-4 border-t border-border flex items-center gap-3">
            <Image
              src={event.host.image || 'https://via.placeholder.com/40'}
              alt={event.host.name}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {event.host.name}
              </p>
              {event.host.rating && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{event.host.rating.toFixed(1)}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
