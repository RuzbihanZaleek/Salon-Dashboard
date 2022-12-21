import * as React from 'react';
import axios from 'axios';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { AddNewButton, DeleteButton, EditButton, StyledDeleteCellItem, StyledEditCellItem, StyledLink } from '../../../StyledComponents/StyledButton';
import { GridRowModes } from '@mui/x-data-grid-pro';
import { Box, Button, styled, TextField, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import Header from '../../../components/Header';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Toolbar from '../../global/Toolbar';
import { updateAdmin } from './updateAdmin';
import { deleteAdmin } from './deleteAdmin';
import Swal from 'sweetalert2'
import { sendEmail } from './sendEmail';
import * as yup from "yup"; //for validation
import { Form, Formik } from 'formik';


const initialValues = {
    email: "",
};

const userSchema = yup.object().shape({
    email: yup.string().email("invalid email")
});

export default function Admin() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [rows, setRows] = React.useState({});
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleFormSubmit = async (values) => {
        //console.log(values);
        sendEmail(values);
    }

    const handleRowEditStart = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = (params, event) => {
        event.defaultMuiPrevented = true;
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
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
                deleteAdmin(id);
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
        updateAdmin(newRow);
        return updatedRow;
    };

    const getAllAdmins = async (e) => {

        const res = await axios.get('http://localhost:8080/get-admin');
        const data = res.data;

        if (res.status === 404 || !data) {
            console.log("error");
        } else {
            setRows(data);
            console.log("data fetched");
        }
    }

    React.useEffect(() => {
        getAllAdmins();
    }, []);

    const columns = [
        { field: "firstName", headerName: "FIRST NAME", flex: 1, cellClassName: "name-column--cell", editable: true },
        { field: "lastName", headerName: "LAST NAME", flex: 1, cellClassName: "name-column--cell", editable: true },
        { field: "phone", headerName: "PHONE", flex: 1, editable: true },
        { field: "email", headerName: "EMAIL", flex: 1, editable: true },
        // {
        //     field: 'actions',
        //     type: 'actions',
        //     headerName: 'ACTIONS',
        //     cellClassName: 'actions',
        //     getActions: ({ row: row }) => {
        //         const isInEditMode = rowModesModel[row._id]?.mode === GridRowModes.Edit;

        //         if (isInEditMode) {
        //             return [
        //                 <StyledEditCellItem theme={theme} colors={colors}
        //                     icon={<SaveIcon />}
        //                     label="Save"
        //                     onClick={handleSaveClick(row._id)}
        //                 />,
        //                 <StyledDeleteCellItem theme={theme} colors={colors}
        //                     icon={<CancelIcon />}
        //                     label="Cancel"
        //                     className="textPrimary"
        //                     onClick={handleCancelClick(row._id)}
        //                     color="inherit"
        //                 />,
        //             ];
        //         }

        //         return [
        //             <StyledEditCellItem theme={theme} colors={colors}
        //                 icon={<EditOutlinedIcon />}
        //                 label="Edit"
        //                 className="textPrimary"
        //                 onClick={handleEditClick(row._id)}
        //                 color="inherit"
        //             />,
        //             <StyledDeleteCellItem theme={theme} colors={colors}
        //                 icon={<DeleteOutlineOutlinedIcon />}
        //                 label="Delete"
        //                 onClick={handleDeleteClick(row._id)}
        //                 color="inherit"
        //             />,
        //         ];
        //     },
        // },
    ];

    return (
        <Box m="20px">
            <Box justifyContent="space-between" alignItems="center">
                <Header title="ADMINS" subtitle="Admin Details" />
                <Box>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={userSchema}
                    >
                        {({ values, errors, handleBlur, handleChange, handleSubmit }) => (
                            <Form onSubmit={handleSubmit}>
                                <Box
                                    display="flex"
                                >
                                    <TextField
                                        variant='filled'
                                        type="text"
                                        label="Email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        name="email"
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        sx={{ width: "30%" }}
                                    />
                                    <Box display="flex" justifyContent="start" marginLeft="10px">
                                        <AddNewButton theme={theme} colors={colors} type="submit" color="secondary" variant="contained">SEND EMAIL</AddNewButton>
                                    </Box>

                                </Box>

                            </Form>
                        )}
                    </Formik>
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
