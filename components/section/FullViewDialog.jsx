import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { MapPin, Building2, Landmark, Ruler } from 'lucide-react'

export default function FullViewDialog({ open, onClose, record }) {
  if (!record) return null

  const { state, city, locality, plotArea, lat, lng } = record

  const mapUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=10&output=embed`

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle className='text-xl'>Full Record View</DialogTitle>
        </DialogHeader>

        <div className='space-y-4'>
          <div>
            <iframe src={mapUrl} width='100%' height='300' loading='lazy' className='rounded-md shadow' allowFullScreen />
          </div>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <div className='flex items-center gap-2'>
              <MapPin className='text-blue-600' size={18} />
              <div>
                <p className='text-sm text-muted-foreground'>State</p>
                <p>{state}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Building2 className='text-yellow-600' size={18} />
              <div>
                <p className='text-sm text-muted-foreground'>City</p>
                <p>{city}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Landmark className='text-green-600' size={18} />
              <div>
                <p className='text-sm text-muted-foreground'>Locality</p>
                <p>{locality}</p>
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Ruler className='text-purple-600' size={18} />
              <div>
                <p className='text-sm text-muted-foreground'>Plot Area</p>
                <p>{plotArea} sqft</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
