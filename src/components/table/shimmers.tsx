import lodash from "lodash";

const SingleShimmer = () => (
  <div className='w-full space-y-2  h-10  justify-center flex flex-col'>
    <div className='bg-gray-300 dark:bg-gray-300 h-3 rounded-md w-full animate-pulse' />
  </div>
);

const DoubleShimmer = () => (
  <div className='w-full space-y-2  h-10  justify-center flex flex-col'>
    <div className='bg-gray-300 dark:bg-gray-300 h-3 rounded-md w-full animate-pulse' />
    <div className='bg-gray-300 dark:bg-gray-300 h-3 rounded-md w-2/3 animate-pulse' />
  </div>
);

const AvatarShimmer = () => (
  <div className='flex space-x-3 items-center h-10'>
    <div className='bg-gray-300 dark:bg-gray-300 h-10 rounded-full w-10 animate-pulse' />
  </div>
);

const ActionsShimmer = ({ actionsCount }: { actionsCount: number }) => (
  <div className='flex space-x-1 h-10 items-center justify-center'>
    {lodash.times(actionsCount, (idx) => (
      <div
        key={idx}
        className='odd:bg-gray-300 even:bg-gray-300 dark:bg-gray-300 h-6 rounded-full w-6 animate-pulse'
      />
    ))}
  </div>
);

const Shimmers = {
  SingleShimmer,
  DoubleShimmer,
  AvatarShimmer,
  ActionsShimmer,
};
export default Shimmers;
