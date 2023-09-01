import * as React from 'react';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

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
  { field: 'action', headerName: 'Action', flex: 0.2 },
  { field: 'initiator', headerName: 'Initiator', flex: 0.2 },
  { field: 'receiver', headerName: 'Receiver', flex: 0.2 },
  { field: 'time', headerName: 'Time', type: 'dateTime', flex: 0.3, valueGetter: ({ value }) => value && new Date(value) },
  {
    field: 'amount', headerName: 'Amount', type: 'number', flex: 0.2, renderCell: (params) => (
      <CurrencyAmount currencyImage="resources/eth-logo-coloured.png" amount={params.value} />)
  },
];

const rows = [
  { id: 1, profileImg: 'resources/profile-image.png', action: 'Sale', initiator: '@SeltradeX', receiver: 'Babushka', time: '2023-09-02T10:30:00', amount: 0.34 },
  { id: 2, profileImg: 'resources/profile-image.png', action: 'Listing', initiator: '@SeltradeX', receiver: 'NFTGod', time: '2023-09-02T11:45:00', amount: 5 },
  { id: 3, profileImg: 'resources/profile-image2.jpg', action: 'Sale', initiator: 's1MR4ndOmNFT', receiver: 'Babushka', time: '2023-09-02T13:15:00', amount: 75 },
  { id: 4, profileImg: 'resources/profile-image.png', action: 'Sale', initiator: '@SeltradeX', receiver: 'monkM3nic', time: '2023-09-02T14:30:00', amount: 200 },
  { id: 5, profileImg: 'resources/profile-image2.jpg', action: 'Listing', initiator: 's1MR4ndOmNFT', receiver: '@SeltradeX', time: '2023-09-02T15:45:00', amount: 60 },
  { id: 6, profileImg: 'resources/profile-image.png', action: 'Sale', initiator: '@SeltradeX', receiver: 'Babushka', time: '2023-09-02T10:30:00', amount: 0.34 },
  { id: 7, profileImg: 'resources/profile-image.png', action: 'Listing', initiator: '@SeltradeX', receiver: 'NFTGod', time: '2023-09-02T11:45:00', amount: 5 },
  { id: 8, profileImg: 'resources/profile-image2.jpg', action: 'Sale', initiator: 's1MR4ndOmNFT', receiver: 'Babushka', time: '2023-09-02T13:15:00', amount: 75 },
  { id: 9, profileImg: 'resources/profile-image.png', action: 'Sale', initiator: '@SeltradeX', receiver: 'monkM3nic', time: '2023-09-02T14:30:00', amount: 200 },
  { id: 10, profileImg: 'resources/profile-image2.jpg', action: 'Listing', initiator: 's1MR4ndOmNFT', receiver: '@SeltradeX', time: '2023-09-02T15:45:00', amount: 60 },
];


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

export default function ActivityTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StripedDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        autoHeight
        autoPageSize
        pageSizeOptions={[5, 10]}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
    </div>
  );
}
