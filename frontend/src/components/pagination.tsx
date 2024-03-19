import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger } from './ui/selectPagination'

interface PaginationProps {
  page: number
  items: number
  totalItems: number
  pages: number
}

export function Pagination({ items, page, pages, totalItems }: PaginationProps) {
  const [, setSearchParams] = useSearchParams();

  function firstPage() {
    setSearchParams(params => {
      params.set('page', '1')

      return params
    })
  }

  function previousPage() {
    if (page - 1 <= 0) {
      return
    }

    setSearchParams(params => {
      params.set('page', String(page - 1))

      return params
    })
  }

  function nextPage() {
    if (page + 1 > pages) {
      return
    }

    setSearchParams(params => {
      params.set('page', String(page + 1))

      return params
    })
  }

  function lastPage() {
    setSearchParams(params => {
      params.set('page', String(pages))

      return params
    })
  }

  return (
    <div className="flex text-sm items-center justify-between text-zinc-100">
      {
        items <= 1
        ? <span className='text-zinc-800'>Exibindo {totalItems} cliente</span>
        : <span className='text-zinc-800'>Exibindo {items} de {totalItems} clientes</span>
      }
      <div className="flex items-center gap-8">
        { pages >= 2 && (
          <>
            <span className='text-zinc-800'>Página {page} de {pages}</span>
            <div className="space-x-1.5">
              <Button
                onClick={firstPage}
                size="icon"
                disabled={page - 1 <= 0}
                className='bg-amber-500 text-zinc-100 border border-gray-950'
              >
                <ChevronsLeft className="size-4" />
                <span className="sr-only">First page</span>
              </Button>
              <Button
                onClick={previousPage}
                size="icon"
                disabled={page - 1 <= 0}
                className='bg-amber-500 text-zinc-100 border border-gray-950'
              >
                <ChevronLeft className="size-4" />
                <span className="sr-only">Previous page</span>
              </Button>
              <Button
                onClick={nextPage}
                size="icon"
                disabled={page + 1 > pages}
                className='bg-amber-500 text-zinc-100 border border-gray-950'
              >
                <ChevronRight className="size-4" />
                <span className="sr-only">Next page</span>
              </Button>
              <Button
                onClick={lastPage}
                size="icon"
                disabled={page + 1 > pages}
                className='bg-orange-500 text-zinc-100 border border-gray-950'
              >
                <ChevronsRight className="size-4" />
                <span className="sr-only">Last page</span>
              </Button>
            </div>
          </>
        )}

        <div className="flex items-center gap-2">
          <span className='text-zinc-800'>Clientes por página</span>
          <Select>
            <SelectTrigger aria-label="Page" className='bg-amber-500'/>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>        
      </div>
    </div>
  )
}