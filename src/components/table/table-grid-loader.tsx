import Shimmers from './shimmers'

export default function TableGridLoader() {
  return (
    <div className='overflow-hidden rounded-lg bg-white shadow'>
    <div className='flex pb-8 px-4 pt-4'>
      <div className='rounded-md h-12 w-12 bg-gray-400' />
      <dd className='ml-4 flex-1 flex items-center'>
        <Shimmers.DoubleShimmer />
      </dd>
    </div>
    <div className=' bg-gray-50 px-3 py-1.5 flex justify-between sm:px-4 space-x-10'>
      <Shimmers.SingleShimmer />
      <Shimmers.ActionsShimmer actionsCount={4} />
    </div>
  </div>
  )
}
