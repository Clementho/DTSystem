import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const columns = [
  { id: "icon", label: "", minWidth: "auto" },
  { id: "action", label: "Action", minWidth: "auto" },
  { id: "initiator", label: "Initiator", minWidth: "auto" },
  { id: "receiver", label: "Receiver", minWidth: "auto" },
  { id: "time", label: "Time", minWidth: "auto" },
  { id: "amount", label: "Amount", minWidth: "auto", align: "right" },
];

function createData(image, action, initiator, receiver, time, amount) {
  return {
    image,
    action,
    initiator,
    receiver,
    time,
    amount,
  };
}

const rows = [
  createData(
    "./resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    3287263
  ),
  createData(
    "/resources/profile-image.png",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    9596961
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    301340
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    9833520
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    9984670
  ),
  createData(
    "/resources/profile-image.png",
    "Listing",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    7692024
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    357578
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    70273
  ),
  createData(
    "/resources/profile-image.png",
    "Listing",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    1972550
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    377973
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    640679
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    242495
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    17098246
  ),
  createData(
    "/resources/profile-image.png",
    "Sale",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    923768
  ),
  createData(
    "/resources/profile-image.png",
    "Listing",
    "@SeltradeX",
    "cr1bypt123",
    "4 Months ago",
    8515767
  ),
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper
      sx={{
        mx: "auto",
        width: "80%",
        borderRadius: "10px",
        backgroundColor: "#1B151F",
      }}
    >
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          backgroundColor: '#1B151F', // Background color
          color: 'white', // Text color
        }}
      />
      <TableContainer sx={{ maxHeight: 440, backgroundColor: '#1B151F'}}>
        <Table stickyHeader aria-label="sticky table" sx={{ backgroundColor: '#1B151F' }}>
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.action}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{
                          minWidth: column.minWidth,
                          color: "#FFFFFF", // Set the font color to white
                        }}>
                          {column.id === "icon" ? (
                            <IconButton>
                              <img
                                src={row.imageUrl}
                                alt="Avatar"
                                width="40"
                                height="40"
                              />{" "}
                              {/* Add this */}
                            </IconButton>
                          ) : column.id === "amount" &&
                            typeof value === "number" ? (
                            // Format the 'amount' column as needed (example: add commas)
                            value.toLocaleString()
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
