import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

const CustomToolBar = () => {
  const style = { color: 'hsl(334, 79%, 48%)' };
  const components = [
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    GridToolbarExport,
  ];

  return (
    <GridToolbarContainer>
      {components.map((Component, index) => (
        <Component key={index} style={style} />
      ))}
    </GridToolbarContainer>
  );
};

export default CustomToolBar;
