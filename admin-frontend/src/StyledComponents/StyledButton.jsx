import { Box, Button, styled, useTheme } from "@mui/material";
import { GridActionsCellItem } from "@mui/x-data-grid";
import { Link } from "react-router-dom";


export const AddNewButton = styled(Button)(({ theme, colors }) => ({
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px",
    "&:hover": {
        backgroundColor: colors.greenAccent[700]
    },
}))

export const StyledLink = styled(Link)(() => ({
    textDecoration: "none",

}))

//Edit Button
export const EditButton = styled(Button)(({ theme, colors }) => ({
    width: "100%",
    m: "0 auto",
    p: "5px",
    display: "flex",
    justifyContent: "center",
    borderRadius: "4px",
    color: colors.grey[100],
    fontWeight: "bold",
    backgroundColor: colors.greenAccent[700],
    "&:hover": {
        backgroundColor: colors.greenAccent[500]
    },
}))

//Delete Button
export const DeleteButton = styled(Button)(({ theme, colors }) => ({
    width: "100%",
    m: "0 auto",
    p: "5px",
    display: "flex",
    justifyContent: "center",
    borderRadius: "4px",
    color: colors.grey[100],
    fontWeight: "bold",
    backgroundColor: colors.redAccent[700],
    "&:hover": {
        backgroundColor: colors.redAccent[500]
    },
}))

//Grid Cell Items

//Edit Button
export const StyledEditCellItem = styled(GridActionsCellItem)(({ theme, colors }) => ({
    width: "50%",
    m: "0 auto",
    p: "5px",
    display: "flex",
    justifyContent: "center",
    borderRadius: "4px",
    color: colors.grey[100],
    fontWeight: "bold",
    backgroundColor: colors.greenAccent[700],
    "&:hover": {
        backgroundColor: colors.greenAccent[500]
    },
}))

//Delete Button
export const StyledDeleteCellItem = styled(StyledEditCellItem)(({ theme, colors }) => ({
    backgroundColor: colors.redAccent[700],
    "&:hover": {
        backgroundColor: colors.redAccent[500]
    },
}))

export const TransparentBox = styled(Box)(() => ({
    flex: "1 1 100%",
    marginLeft: "15px",
    background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, #3E4396 100%)"
}))
