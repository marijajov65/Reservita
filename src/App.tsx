import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns = [
    { field: 'vrijeme', headerName: 'Vrijeme', flex: 1, },
    { field: 'teren_1', headerName: 'Teren 1', flex: 1 },
    { field: 'teren_2', headerName: 'Teren 2', flex: 1 },
    { field: 'teren_3', headerName: 'Teren 3', flex: 1},
    { field: 'teren_4', headerName: 'Teren 4', flex: 1 },
];

const rows = [
    { id: 1, vrijeme: '7:00', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 2, vrijeme: '7:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 3, vrijeme: '8:00', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 4, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 5, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 6, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 7, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 8, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 9, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 10, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 11, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 12, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 13, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 14, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 15, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 16, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 17, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 18, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 19, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 20, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 21, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 22, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 23, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 24, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 25, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 26, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 27, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 28, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 29, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 30, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 31, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},
    { id: 32, vrijeme: '8:30', teren_1: "blabla", teren_2: 'test', teren_3: 'test', teren_4: 'test'},



];

const App = () => (
    <Box style={{ height: '100%', width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            disableColumnResize={true}
            disableColumnMenu={true}
            disableColumnSorting={true}
            rowHeight={25}
            sx={{
                '& .MuiDataGrid-virtualScrollerRenderZone': {
                    backgroundImage: 'url("tk_borac_logo_bw.png")', // Add your image URL here
                    backgroundSize: 'contain', // Ensure the image covers the entire grid area
                    backgroundPosition: 'center calc(50% + 2vh)', // Center the image
                    backgroundRepeat: 'no-repeat', // Prevent tiling
                },
                '& .MuiDataGrid-columnHeaders': {
                    backgroundColor: 'transparent',
                    color: '#000',
                },
                '& .MuiDataGrid-footerContainer': {
                    display: 'none', // Hide the pagination controls
                },
            }}
        />
    </Box>
);

export default App;
