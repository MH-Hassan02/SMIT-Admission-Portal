import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const ProjectTable = ({
  data,
  header,
  rollNumber,
  cnicNumber,
  phoneNumber,
  isPass,
  onEdit,
}) => {
  return (
    <Box sx={{ mt: 4, mb: 4 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>{header}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>{rollNumber}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>{cnicNumber}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>{phoneNumber}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>{isPass}</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.rollNumber}</TableCell>
                <TableCell>{item.cnicNumber}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.isPass}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(item)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ProjectTable;
