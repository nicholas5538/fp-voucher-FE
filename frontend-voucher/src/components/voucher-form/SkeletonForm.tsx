import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonForm = () => {
  return (
    <>
      <Paper
        className='mx-auto w-full max-w-2xl rounded-lg p-4 lg:mx-0 xl:max-w-3xl'
        elevation={3}
      >
        <Stack direction='column' spacing={2}>
          <Skeleton
            animation='wave'
            variant='text'
            sx={{ fontSize: '1.875rem', width: '200px' }}
          />
          <Skeleton
            animation='wave'
            variant='text'
            sx={{ fontSize: '1rem', width: '150px' }}
          />
          <div className='flex flex-row items-center justify-start space-x-6'>
            <Skeleton
              animation='wave'
              className='h-[38px] w-[38px]'
              variant='circular'
            />
            <Skeleton
              animation='wave'
              className='h-[38px] w-[38px]'
              variant='circular'
            />
            <Skeleton
              animation='wave'
              className='h-[38px] w-[38px]'
              variant='circular'
            />
          </div>
          <Skeleton
            animation='wave'
            className='h-[56px] w-full'
            variant='rectangular'
          />
          <div className='grid grid-cols-1 space-y-6 md:grid-cols-3 md:space-y-0 md:space-x-4 md:pr-4'>
            <Skeleton
              animation='wave'
              className='h-[56px] w-full md:col-span-2'
              variant='rectangular'
            />
            <Skeleton
              animation='wave'
              className='col-span-1 h-[56px] w-full'
              variant='rectangular'
            />
          </div>
          <div className='flex flex-col items-start space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-5'>
            <Skeleton
              animation='wave'
              className='col-span-1 h-[56px] w-full'
              variant='rectangular'
            />
            <Skeleton
              animation='wave'
              className='col-span-1 h-[56px] w-full'
              variant='rectangular'
            />
          </div>
          <div className='mb-6 flex flex-col items-start space-y-6 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-5'>
            <Skeleton
              animation='wave'
              className='h-[56px] w-full'
              variant='rectangular'
            />
            <Skeleton
              animation='wave'
              className='h-[56px] w-full'
              variant='rectangular'
            />
          </div>
          <Skeleton
            animation='wave'
            className='h-[30px] w-[400px]'
            variant='rectangular'
          />
        </Stack>
      </Paper>
      <aside className='ml-8 hidden w-[25%] rounded-lg xl:flex xl:w-3/6 xl:max-w-md xl:flex-col xl:items-center xl:justify-around xl:space-y-6'>
        <Skeleton
          animation='wave'
          className='h-[68px] w-[180px]'
          variant='rectangular'
        />
        <Skeleton
          animation='wave'
          className='h-[204px] w-[200px]'
          variant='rectangular'
        />
        <Skeleton
          animation='wave'
          className='h-[127px] w-[428px]'
          variant='rectangular'
        />
      </aside>
    </>
  );
};

export default SkeletonForm;
