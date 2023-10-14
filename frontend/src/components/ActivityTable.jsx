import * as React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { Box, LinearProgress, useScrollTrigger } from '@mui/material';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

function CustomNoRowsGridOverlay() {
  return (
      <StyledGridOverlay>
        <Box sx={{ mt: 1 }}>No Records Found</Box>
      </StyledGridOverlay>
  );
}

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  "&.MuiDataGrid-root": {
    color: "#FFFFFF",
    backgroundColor: "#1B151F"
  },
  // Style the sort and menu icons
  '.MuiDataGrid-columnHeader .MuiDataGrid-sortIcon, & .MuiDataGrid-columnHeader:hover .MuiDataGrid-sortIcon': {
    color: '#FFFFFF',
  },
  '.MuiDataGrid-columnHeader .MuiDataGrid-menuIconButton, & .MuiDataGrid-columnHeader:hover .MuiDataGrid-menuIconButton': {
    color: '#FFFFFF',
  },
  ".MuiToolbar-root": {
    color: "#FFFFFF"
  },
  ".MuiToolbar-root .MuiSvgIcon-root": {
    color: "#FFFFFF"
  },
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: "#2B2430",
  },
}));

export default function ActivityTable({rows, isLoading}) {
  // Define a custom component to render the currency image and amount
  function CurrencyAmount({ currencyImage, amount }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', }}>
        <span>{amount}</span>
        <img src={currencyImage} alt="Currency" width={20} height={30} style={{ marginLeft: "10px" }} />
      </div>
    );
  }

  const columns = [
    { field: 'profileImg', headerName: '', flex: 0.1, renderCell: (params) => <Avatar src={params.value} /> },
    { field: 'action', headerName: 'Action', flex: 0.15 },
    { field: 'assetName', headerName: 'Asset', flex: 0.15},
    { field: 'initiator', headerName: 'Initiator', flex: 0.2},
    { field: 'receiver', headerName: 'Receiver', flex: 0.2},
    { field: 'time', headerName: 'Time', type: 'dateTime', flex: 0.2, 
      valueFormatter: ({ value }) => {
        if (!value) return "";
      
        const date = new Date(value);
        const options = {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        };
  
        const userLocale = navigator.language; // Get the user's locale
      
        return new Intl.DateTimeFormat(userLocale, options).format(date);
      },    
    },
    {
      field: 'amount', headerName: 'Amount', type: 'number', flex: 0.15, renderCell: (params) => (
        <CurrencyAmount currencyImage="http://localhost:3000/resources/eth-logo-coloured.png" amount={params.value} />)
    },
  ];

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <StripedDataGrid
        autoHeight
        disableRowSelectionOnClick
        pagination  
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        loading={isLoading}
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: CustomNoRowsGridOverlay,
          noResultsOverlay: CustomNoRowsGridOverlay,
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
    </Box>
  );
}
