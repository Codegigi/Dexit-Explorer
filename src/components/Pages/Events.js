// import React from 'react';

// const Events = () => {
// return (
// 	<div
// 	style={{
// 		display: 'flex',
// 		justifyContent: 'Right',
// 		alignItems: 'Right',
// 		height: '100vh'
// 	}}
// 	>
// 	<h1>Welcome to GeeksforGeeks Events</h1>
// 	</div>
// );
// };

// export default Events;

import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Web3 from "web3";
import { useState, useEffect } from "react";
import { Button, Input } from "@mui/material";

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default function CustomPaginationActionsTable() {
  const web3 = new Web3();
  web3.setProvider("https://testnet.dexit.network");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchBlock, setSearchBlock] = React.useState(0);

  // Avoid a layout jump when reaching the last page with empty rows.

  const [dd, setdd] = useState([]);

  useEffect(() => {
    Init();
    return () => {};
  }, []);

  useEffect(() => {
    // console.log("usee");
    return () => {
      clearInterval(id);
    };
  }, [dd]);

  const id = setInterval(() => {
    // console.log("setinterval");
    Init();
  }, 30000);
  
  async function Init() {
    // console.log("init");
    let ab = [];
    let bc = [];

    // console.log("start");
    let currentBlock = await web3.eth.getBlockNumber();
    // console.log("current block", currentBlock);
    for (let j = currentBlock - 5; j < currentBlock; j++) {
      let getBlockDetails = await web3.eth.getBlock(j);
    //   console.log(getBlockDetails);
    //   console.log(JSON.stringify(getBlockDetails));
      bc.push(getBlockDetails);
    }
    // console.log("updating the property");
    setdd([...dd, ...bc]);
    // let tr = await web3.eth.getBlock(38146);
    // console.log("trrr", tr.transactions);
    // for (let i = 0; i < tr.transactions.length; i++) {
    //   let getTrans = await web3.eth.getTransaction(tr.transactions[i]);
    //   console.log("transaction", getTrans);
    //   ab.push(getTrans);
    // }
    // console.log("abababba", ab);
    // setdd([...dd, ...ab]);
    // console.log("fkjsahsdjkhfsdjk", dd);
  }

  const rows = dd;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  async function searchTransactionByBlock() {
    let block = [];
    // console.log("seach called with value" + searchBlock);
    let blockDetails = await web3.eth.getBlock(searchBlock);
    block.push(blockDetails)
    // console.log("Block", blockDetails);
    setdd(block);
  }
  return (
    <>
      {/* {console.log("abccbbcbcbcb999999", dd.length)} */}
      <div className="container-fluid">
        <h1>Block Details</h1>

        <Input
          type="number"
          placeholder="Search block"
          onChange={(e) => setSearchBlock(e.target.value)}
        />
        <Button
          variant="outlined"
          onClick={searchTransactionByBlock}
          sx={{ ml: 2 }}
        >
          Search
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Number</TableCell>
                <TableCell align="left">Hash</TableCell>
                <TableCell align="center">Transactions</TableCell>
                <TableCell align="left">Timestamp</TableCell>
              </TableRow>
            </TableHead>
            {dd.length > 0 ? (
              <TableBody>
                {(rowsPerPage > 0
                  ? rows.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : dd
                ).map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{row.number}</TableCell>
                    <TableCell align="left">{row.hash}</TableCell>
                    <TableCell align="center">{row.transactions}</TableCell>
                    <TableCell align="left">{row.timestamp}</TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            ) : (
              <TableRow align="center">
                <TableCell colSpan={12} align="center">
                  No Transactions
                </TableCell>
              </TableRow>
            )}{" "}
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15, { label: "All", value: -1 }]}
                  colSpan={3}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

