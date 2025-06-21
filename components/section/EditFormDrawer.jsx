'use client'

import { useEffect, useState } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { states } from '@/data/indianStates'
import { isValidLatitude, isValidLongitude, setLocalStorage, getLocalStorage, now } from '@/utils'
import { toast } from 'sonner'

const STATES = states.map((s) => s.state)

export default function EditRecordDrawer({ open, onClose, record, refetch }) {
  const [formData, setFormData] = useState({ state: '', city: '', locality: '', lat: '', lng: '', plotArea: '' })

  const getCities = (_state) => {
    const stateData = states.find((state) => state.state === _state)
    return stateData ? stateData.districts : []
  }

  useEffect(() => {
    if (record) setFormData(record)
  }, [record])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => {
      if (name === 'state') {
        return {
          ...prev,
          state: value,
          city: '',
        }
      }
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const { state, city, locality, lat, lng, plotArea } = formData
    if (!state || !city || !locality || !lat || !lng || !plotArea) {
      toast.error('Please fill all fields')
      return
    }
    if (isNaN(lat) || isNaN(lng) || isNaN(plotArea)) {
      toast.error('Latitude, Longitude and Plot Area must be numbers')
      return
    }
    if (!isValidLatitude(parseFloat(lat))) {
      toast.error('Please enter a valid latitude between -90 and 90')
      return
    }
    if (!isValidLongitude(parseFloat(lng))) {
      toast.error('Please enter a valid longitude between -180 and 180')
      return
    }
    if (plotArea <= 0) {
      toast.error('Plot Area must be a positive number')
      return
    }

    const allRecords = getLocalStorage('records') || []
    const updated = allRecords.map((r) => (r.id === record.id ? { ...formData, id: record.id } : r))
    setLocalStorage('records', updated)
    refetch()
    onClose()
  }

  return (
    <Drawer open={open} onClose={onClose}>
      <DrawerContent className='p-6 max-w-xl mx-auto'>
        <DrawerHeader>
          <DrawerTitle className='text-xl font-semibold'>Edit Location Details</DrawerTitle>
        </DrawerHeader>

        <form className='grid gap-6 mt-2' onSubmit={handleUpdate}>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <Label htmlFor='state' className='mb-2'>
                State
              </Label>
              <Select name='state' id='state' onChange={handleChange} value={formData.state}>
                <option disabled value=''>
                  Select State
                </option>
                {STATES.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </div>

            <div className='flex-1'>
              <Label htmlFor='city' className='mb-2'>
                City
              </Label>
              <Select name='city' id='city' onChange={handleChange} value={formData.city} disabled={!formData.state}>
                <option disabled value=''>
                  Select City
                </option>
                {getCities(formData.state).map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='locality'>Locality</Label>
            <Input onChange={handleChange} name='locality' value={formData.locality} placeholder='Enter locality' />
          </div>

          <div className='flex gap-4'>
            <div className='flex-1'>
              <Label htmlFor='lat' className='mb-2'>
                Latitude
              </Label>
              <Input type='number' step='any' onChange={handleChange} name='lat' value={formData.lat} placeholder='21.23' />
            </div>
            <div className='flex-1'>
              <Label htmlFor='lng' className='mb-2'>
                Longitude
              </Label>
              <Input type='number' step='any' onChange={handleChange} name='lng' value={formData.lng} placeholder='72.80' />
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='plotArea'>Plot Area (sqft)</Label>
            <Input onChange={handleChange} type='number' name='plotArea' value={formData.plotArea} placeholder='Ex: 13000' />
          </div>

          <div className='mt-6 space-y-2'>
            <Button className='w-full' type='submit'>
              Update
            </Button>
            <Button variant='outline' type='button' className='w-full' onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
