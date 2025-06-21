import { useState, useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Select } from '../ui/select'

export default function FilterBar({ allRecords, onFilter }) {
  const [states, setStates] = useState([])
  const [filters, setFilters] = useState({
    state: '',
    plotAreaMin: '',
    plotAreaMax: '',
    postDate: '',
  })

  useEffect(() => {
    const uniqueStates = [...new Set(allRecords.map((item) => item.state))]
    setStates(uniqueStates)
  }, [allRecords])

  const applyFilters = () => {
    let result = [...allRecords]

    if (filters.state) {
      result = result.filter((item) => item.state === filters.state)
    }

    if (filters.plotAreaMin || filters.plotAreaMax) {
      result = result.filter((item) => {
        const area = parseInt(item.plotArea)
        return (!filters.plotAreaMin || area >= parseInt(filters.plotAreaMin)) && (!filters.plotAreaMax || area <= parseInt(filters.plotAreaMax))
      })
    }

    if (filters.postDate) {
      const selectedDate = new Date(filters.postDate)
      result = result.filter((item) => {
        const createdAtDate = new Date(item.createdAt * 1000)
        return createdAtDate.toDateString() === selectedDate.toDateString()
      })
    }

    onFilter(result)
  }

  return (
    <Card className='mb-6 shadow'>
      <CardContent>
        <div className='mb-4 grid gap-4 md:grid-cols-4'>
          <Select value={filters.state} onChange={(e) => setFilters({ ...filters, state: e.target.value })}>
            <option value=''>All States</option>
            {states.map((dist, i) => (
              <option key={i} value={dist}>
                {dist}
              </option>
            ))}
          </Select>

          <div className='flex gap-2'>
            <Input
              type='number'
              placeholder='Min Area'
              value={filters.plotAreaMin}
              onChange={(e) => setFilters({ ...filters, plotAreaMin: e.target.value })}
            />
            <Input
              type='number'
              placeholder='Max Area'
              value={filters.plotAreaMax}
              onChange={(e) => setFilters({ ...filters, plotAreaMax: e.target.value })}
            />
          </div>

          <Input type='date' value={filters.postDate} onChange={(e) => setFilters({ ...filters, postDate: e.target.value })} />

          <Button onClick={applyFilters} variant='outline' className='w-full md:w-auto'>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
