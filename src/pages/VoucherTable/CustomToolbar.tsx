import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

const CustomToolBar = () => {
  const components = [
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
  ];

  return (
    <GridToolbarContainer>
      {components.map((Component, index) => (
        <Component
          key={index}
          className='font-mont font-semibold tracking-wider text-gray-700 hover:bg-pink-100'
        />
      ))}
    </GridToolbarContainer>
  );
};

export default CustomToolBar;
