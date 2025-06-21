import { Button } from '@/components/ui/button'
import { getLocalStorage, setLocalStorage } from '@/utils'
import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from '../ui/alert-dialog'
import { AlertDialogTitle } from '@radix-ui/react-alert-dialog'

export default function DeleteRecordDialog({ open, onClose, recordId, refetch }) {
  const handleDelete = () => {
    const allRecords = getLocalStorage('records') || []
    const filtered = allRecords.filter((r) => r.id !== recordId)
    setLocalStorage('records', filtered)
    refetch()
    onClose()
  }

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className='sm:max-w-md'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-lg'>Delete this record?</AlertDialogTitle>
        </AlertDialogHeader>

        <p className='text-muted-foreground text-sm'>This action is permanent and cannot be undone.</p>

        <AlertDialogFooter className='mt-4'>
          <Button variant='destructive' onClick={handleDelete}>
            Yes, Delete
          </Button>
          <Button variant='outline' onClick={onClose}>
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
