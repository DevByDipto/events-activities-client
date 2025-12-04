import React from 'react'
import { Search, X } from 'lucide-react'
import { Input } from './Input' 
import { Dropdown } from './Dropdown' 
import { Button } from './Button' 
import {
  EventFilters as FilterState,
  ALL_EVENT_TYPES,
  EVENT_TYPE_LABELS,
} from "../../types/index"
import { uniqueLocations } from '../../utils/mockData'
import { Checkbox } from './Checkbox'

interface EventFiltersProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  onClear: () => void
}

export function EventFilters({
  filters,
  onChange,
  onClear,
}: EventFiltersProps) {
  const eventTypeOptions = ALL_EVENT_TYPES.map((type) => ({
    value: type,
    label: EVENT_TYPE_LABELS[type],
  }))

  const locationOptions = uniqueLocations.map((loc) => ({
    value: loc,
    label: loc,
  }))

  const timeFilterOptions = [
    {
      value: 'all',
      label: 'All Events',
    },
    {
      value: 'upcoming',
      label: 'Upcoming Events',
    },
    {
      value: 'past',
      label: 'Past Events',
    },
  ]

  const hasActiveFilters =
    filters.search ||
    filters.eventType ||
    filters.location ||
    filters.date ||
    filters.isFeatured ||
    filters.timeFilter !== 'all'

  return (
    <div className="bg-card rounded-xl border border-border p-4 md:p-6 space-y-4">
      {/* Search */}
      <Input
        placeholder="Search events by name..."
        value={filters.search}
        onChange={(e) =>
          onChange({
            ...filters,
            search: e.target.value,
          })
        }
        leftIcon={<Search className="w-4 h-4" />}
      />

      {/* Filters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Dropdown
          label="Event Type"
          placeholder="All Types"
          options={eventTypeOptions}
          value={filters.eventType}
          onChange={(value) =>
            onChange({
              ...filters,
              eventType: value as FilterState['eventType'],
            })
          }
        />

        <Dropdown
          label="Location"
          placeholder="All Locations"
          options={locationOptions}
          value={filters.location}
          onChange={(value) =>
            onChange({
              ...filters,
              location: value,
            })
          }
        />

        <div className="w-full">
          <label className="block text-sm font-medium text-foreground mb-1.5">
            Date
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) =>
              onChange({
                ...filters,
                date: e.target.value,
              })
            }
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>

        <Dropdown
          label="Time Filter"
          placeholder="All Events"
          options={timeFilterOptions}
          value={filters.timeFilter}
          onChange={(value) =>
            onChange({
              ...filters,
              timeFilter: value as FilterState['timeFilter'],
            })
          }
        />
      </div>

      {/* Featured Checkbox & Clear */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <Checkbox
          label="Featured Events Only"
          checked={filters.isFeatured}
          onChange={(checked) =>
            onChange({
              ...filters,
              isFeatured: checked,
            })
          }
        />

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            leftIcon={<X className="w-4 h-4" />}
          >
            Clear Filters
          </Button>
        )}
      </div>
    </div>
  )
}
