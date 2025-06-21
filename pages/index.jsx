import Header from '@/components/layout/Header'
import AddNew from '@/components/section/AddNew'
import DeleteRecordDialog from '@/components/section/DeleteRecordDialogue'
import EditFormDrawer from '@/components/section/EditFormDrawer'
import FilterBar from '@/components/section/FilterBar'
import FullViewDialog from '@/components/section/FullViewDialog'
import NoRecords from '@/components/section/NoRecord'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getLocalStorage, getRelativeTime } from '@/utils'
import { MapPin, Building2, Landmark, Ruler, Trash2, Pencil, Eye, Timer } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [storedItems, setStoredItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [addNewopen, setAddNewopen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  const getRecords = () => {
    const items = getLocalStorage('records') || []
    const latestFirst = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    setStoredItems(latestFirst)
    setFilteredItems(latestFirst)
  }

  useEffect(() => {
    getRecords()
  }, [])

  const handleEditClick = (record) => {
    setSelectedRecord(record)
    setIsDrawerOpen(true)
  }

  const handleSave = (updatedRecord) => {
    const updatedRecords = storedItems.map((rec) => (rec.id === updatedRecord.id ? { ...rec, ...updatedRecord } : rec))
    setStoredItems(updatedRecords)
    localStorage.setItem('records', JSON.stringify(updatedRecords))
  }

  const handleFilter = (filteredData) => {
    setFilteredItems(filteredData)
  }

  return (
    <>
      <Header />
      <div className='min-h-screen px-3 md:px-0 md:w-3/4 mx-auto pb-10'>
        <div className='flex justify-end items-center my-4'>
          <Button onClick={() => setAddNewopen(true)}>Add +</Button>
        </div>
        <FilterBar allRecords={storedItems} onFilter={handleFilter} />
        {filteredItems.length === 0 ? (
          <NoRecords />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {filteredItems.map(({ state, city, locality, plotArea, lat, lng, createdAt, id }, index) => (
              <Card key={index} className='shadow-lg pb-0 justify-between'>
                <CardContent className='grid gap-4 text-left px-4'>
                  <div className='flex justify-between items-start'>
                    <div className='space-y-3'>
                      <div className='flex items-center gap-3'>
                        <MapPin className='text-blue-600' size={20} />
                        <div>
                          <p className='text-sm text-muted-foreground'>State</p>
                          <p className='font-medium'>{state}</p>
                        </div>
                      </div>

                      <div className='flex items-center gap-3'>
                        <Building2 className='text-yellow-600' size={20} />
                        <div>
                          <p className='text-sm text-muted-foreground'>City</p>
                          <p className='font-medium'>{city}</p>
                        </div>
                      </div>

                      <div className='flex items-center gap-3'>
                        <Landmark className='text-green-600' size={20} />
                        <div>
                          <p className='text-sm text-muted-foreground'>Locality</p>
                          <p className='font-medium'>{locality}</p>
                        </div>
                      </div>

                      <div className='flex items-center gap-3'>
                        <Ruler className='text-purple-600' size={20} />
                        <div>
                          <p className='text-sm text-muted-foreground'>Plot Area</p>
                          <p className='font-medium'>{plotArea} sqft</p>
                        </div>
                      </div>

                      <div className='flex items-center gap-1'>
                        <Timer className='text-sm text-muted-foreground' size={14} />
                        <p className='text-sm text-muted-foreground'>{getRelativeTime(createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className='flex justify-center border-t'>
                  <Button
                    onClick={() => setDeleteId(id)}
                    variant='ghost'
                    size='icon'
                    className='text-muted-foreground hover:text-red-600 rounded-e-none rounded-t-none w-1/3 h-12 border-e-0'
                  >
                    <Trash2 size={18} />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-muted-foreground hover:text-blue-600 rounded-none w-1/3 h-12 border-x'
                    onClick={() => handleEditClick({ state, city, locality, plotArea, lat, lng, createdAt, id })}
                  >
                    <Pencil size={18} />
                  </Button>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-muted-foreground hover:text-blue-600 rounded-s-none rounded-t-none w-1/3 h-12 border-s-0'
                    onClick={() => {
                      setSelectedRecord({ state, city, locality, plotArea, lat, lng, createdAt, id })
                      setViewDialogOpen(true)
                    }}
                  >
                    <Eye size={18} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
        <AddNew refetch={getRecords} open={addNewopen} onClose={setAddNewopen} />
        <EditFormDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} record={selectedRecord} onSave={handleSave} refetch={getRecords} />
        <DeleteRecordDialog open={!!deleteId} onClose={() => setDeleteId(null)} recordId={deleteId} refetch={getRecords} />
        <FullViewDialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)} record={selectedRecord} />
      </div>
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  const userSession = req.cookies.userSession || null
  if (userSession) {
    return {
      props: {},
    }
  }

  return {
    redirect: { destination: '/login', permanent: false },
  }
}
