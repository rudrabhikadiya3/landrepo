import { useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { states } from '../../data/indianStates'
import { getLocalStorage, setLocalStorage, isValidLatitude, isValidLongitude, now, uniqId } from '@/utils'
import { Select } from '../ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { toast } from 'sonner'

const STATES = states.map((state) => state.state)

export default function AddNew({ refetch, open, onClose }) {
  const [formData, setFormData] = useState({ state: '', city: '', locality: '', lat: '', lng: '', plotArea: '' })
  const [mounted, setMounted] = useState(false)

  const getCities = (_state) => {
    const stateData = states.find((state) => state.state === _state)
    return stateData ? stateData.districts : []
  }

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

  const handleSubmit = (e) => {
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

    const existingUsers = getLocalStorage('records') || []
    setLocalStorage('records', [...existingUsers, { id: uniqId(), ...formData, createdAt: now() }])
    refetch()
    setFormData({ state: '', city: '', locality: '', lat: '', lng: '', plotArea: '' })
    onClose()
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onClose(o)
        if (!o) setFormData({ state: '', city: '', locality: '', lat: '', lng: '', plotArea: '' })
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new record</DialogTitle>
        </DialogHeader>

        <form className='grid gap-6'>
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
            <Input onChange={handleChange} id='locality' name='locality' value={formData.locality} placeholder='Enter locality' />
          </div>

          <div className='flex gap-4'>
            <div className='flex-1'>
              <Label htmlFor='lat' className='mb-2'>
                Latitude
              </Label>
              <Input type='number' step='any' onChange={handleChange} id='lat' name='lat' placeholder='21.23' />
            </div>
            <div className='flex-1'>
              <Label htmlFor='lng' className='mb-2'>
                Longitude
              </Label>
              <Input type='number' step='any' onChange={handleChange} id='lng' name='lng' placeholder='72.80' />
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='plotArea'>Plot Area (sqft)</Label>
            <Input onChange={handleChange} type='number' id='plotArea' name='plotArea' placeholder='Ex: 13000' />
          </div>

          <Button className='w-full' type='submit' onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
