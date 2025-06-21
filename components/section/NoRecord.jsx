import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function NoRecords() {
  return (
    <Card className='w-full text-center py-10 border-dashed shadow-none'>
      <CardContent className='flex flex-col items-center gap-4'>
        <AlertCircle className='text-muted-foreground h-10 w-10' />
        <h3 className='text-lg font-medium text-muted-foreground'>No Records Found</h3>
        <p className='text-sm text-gray-500 max-w-xs'>
          We couldn’t find any records matching your criteria. Try adding a new one or changing the filters.
        </p>
      </CardContent>
    </Card>
  )
}
