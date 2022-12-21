import * as React from 'react';
import axios from 'axios';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { AddNewButton, DeleteButton, EditButton, StyledDeleteCellItem, StyledEditCellItem, StyledLink } from '../../../StyledComponents/StyledButton';
import { GridRowModes } from '@mui/x-data-grid-pro';
import { Box, Button, Chip, LinearProgress, styled, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import Header from '../../../components/Header';
import { DataGrid } from '@mui/x-data-grid';
import Toolbar from '../../global/Toolbar';
import { TimePicker } from '@mui/x-date-pickers';
import { deleteReservation } from './deleteReservation';
import Swal from 'sweetalert2'
import { updateReservation } from './updateReservation';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { string } from 'prop-types';
import { Link, Route } from 'react-router-dom';

export default function Reservations() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [rows, setRows] = React.useState({});
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [stylish, setStylish] = React.useState([]);
    const [clients, setClients] = useState([]);
    const clientsArray = [];

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        window.location = `/editBookingForm/${id}`;
        //setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete'
        }).then((result) => {
            if (result.isConfirmed) {
                setRows(rows.filter((row) => row._id !== id));
                deleteReservation(id);
            }
        })
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row._id === newRow._id ? updatedRow : row)));
        updateReservation(newRow);
        return updatedRow;
    };

    const getAllReservations = async (e) => {

        const res = await axios.get('http://localhost:8080/get-reservation');
        const data = res.data;

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setRows(data);
            console.log("data fetched");
        }
    }

    const getAllStylish = async (e) => {

        const res = await axios.get('http://localhost:8080/get-stylish');
        const data = res.data;

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setStylish(data);
            console.log("data fetched");
        }
    }

    const fetchClients = async () => {
        const response = await axios.get('http://localhost:8080/get-client');
        const newData = await response.data;
        console.log(newData);
        for (var j = 0; j < newData.length; j++) {
            var name = newData[j].firstName + " " + newData[j].lastName;
            clientsArray.push(name);
        }
        console.log(clientsArray);
    }

    React.useEffect(() => {
        getAllReservations();
        //getAllStylish();
        //fetchClients();
    }, []);

    const columns = [
        { field: "clientName", headerName: "CLIENT NAME", flex: 1, cellClassName: "name-column--cell", editable: true },
        { field: "service", headerName: "SERVICE", type: "singleSelect", valueOptions: ['Haircut', 'Hair styling', 'Makeup'], flex: 1, editable: true },
        { field: "stylishName", headerName: "STYLISH NAME", flex: 1, cellClassName: "name-column--cell", editable: true },
        { field: "date", headerName: "DATE", type: "date", flex: 1, editable: false },
        { field: "time", headerName: "TIME", type: 'dateTime', format: 'hh:mm A', flex: 1, editable: false },
        {
            field: "status",
            headerName: "STATUS",
            type: 'singleSelect',
            valueOptions: ['Not Completed', 'Inprogress', 'Completed'],
            flex: 1,
            editable: true,
            renderCell: ({ row: row }) => (
                <strong>
                    <Chip
                        variant="outlined"
                        icon={row.status == "Not Completed" ? <CloseIcon /> :
                            (row.status == "Completed" ? <CheckIcon /> : <InfoOutlinedIcon />)}
                        label={row.status}
                        color={row.status == "Not Completed" ? "error" :
                            (row.status == "Completed" ? "success" : "info")}
                    />
                </strong>
            ),
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'ACTIONS',
            cellClassName: 'actions',
            getActions: ({ row: row }) => {
                const isInEditMode = rowModesModel[row._id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <StyledEditCellItem theme={theme} colors={colors}
                            icon={<SaveIcon />}
                            label="Save"
                            onClick={handleSaveClick(row._id)}
                        />,
                        <StyledDeleteCellItem theme={theme} colors={colors}
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(row._id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <StyledEditCellItem theme={theme} colors={colors}
                        icon={<EditOutlinedIcon />}
                        label="Edit"
                        className="textPrimary"
                        //onClick={handleEditClick(row._id)}
                        onClick={handleEditClick(row._id)}
                        color="inherit"
                    />,
                    <StyledDeleteCellItem theme={theme} colors={colors}
                        icon={<DeleteOutlineOutlinedIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(row._id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="RESERVATIONS" subtitle="Booking Details" />
                <Box>
                    <StyledLink to="/bookingForm">
                        <AddNewButton theme={theme} colors={colors}>
                            New Booking
                        </AddNewButton>
                    </StyledLink>
                </Box>
            </Box>
            <Box m="40px 0 0 0" height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none"
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300]
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`
                    },
                    "& .MuiDataGrid-root .MuiDataGrid-cellContent": {
                        fontSize: `13px !important`
                    },
                }}>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    getRowId={row => row._id}
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                    onRowEditStart={handleRowEditStart}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    componentsProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                    components={{ Toolbar: Toolbar }}
                />
            </Box>
        </Box >
    );
}
