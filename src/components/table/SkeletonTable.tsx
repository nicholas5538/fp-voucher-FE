import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

const SkeletonTable = () => {
  return (
    <Box
      sx={{
        boxShadow: 4,
        border: 2,
        borderColor: 'hsl(334, 79%, 50%)',
        borderRadius: 1,
        padding: 2,
      }}
    >
      <Stack direction='row' spacing={2} className='mb-4'>
        {Array(4)
          .fill(true)
          .map((_, i) => (
            <Skeleton
              key={i}
              animation='wave'
              variant='rectangular'
              width={50}
            />
          ))}
      </Stack>
      <Stack direction='column' spacing={2}>
        {Array(9)
          .fill(true)
          .map((_, i) => (
            <Skeleton
              key={i}
              animation='wave'
              variant='rectangular'
              className='h-[44px] w-full'
            />
          ))}
      </Stack>
    </Box>
  );
};

export default SkeletonTable;
