import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

export default function AddNew() {
  return (
    <Card className='shadow-lg my-4'>
      <CardHeader>
        <CardTitle className='text-xl font-semibold'>Add Location Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form className='grid gap-6'>
          <div className='flex gap-4'>
            <div className='flex-1'>
              <Label htmlFor='district' className='mb-2'>
                Destrict
              </Label>
              <Input id='district' name='district' placeholder='21.1702' />
            </div>
            <div className='flex-1'>
              <Label htmlFor='city' className='mb-2'>
                City
              </Label>
              <Input id='city' name='city' placeholder='72.8311' />
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='locality'>Locality</Label>
            <Input id='locality' name='locality' placeholder='Enter locality' />
          </div>

          <div className='flex gap-4'>
            <div className='flex-1'>
              <Label htmlFor='lat' className='mb-2'>
                Latitude
              </Label>
              <Input id='lat' name='lat' placeholder='21.1702' />
            </div>
            <div className='flex-1'>
              <Label htmlFor='lng' className='mb-2'>
                Longitude
              </Label>
              <Input id='lng' name='lng' placeholder='72.8311' />
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='plotArea'>Plot Area</Label>
            <Input id='plotArea' name='plotArea' placeholder='Ex: 13000 sqft' />
          </div>

          <Button type='submit' className='w-full'>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
