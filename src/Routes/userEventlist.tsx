import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const UserEventlist = () => {
  const [eventData, setEventData] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const localStorageData = localStorage.getItem("events");
    if (localStorageData) {
      const parsedData = JSON.parse(localStorageData);
      setEventData(parsedData);
    }
  }, []);

  const handleDelete = (index: number) => {
    const newData = [...eventData];
    newData.splice(index, 1);
    setEventData(newData);
    localStorage.setItem('events', JSON.stringify(newData));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const filteredData = eventData.filter((event: any) => {
    const { name, start, end, title } = event;
    const searchValueLower = searchValue.toLowerCase();

    return (
      name.toLowerCase().includes(searchValueLower) ||
      start.toLowerCase().includes(searchValueLower) ||
      end.toLowerCase().includes(searchValueLower) ||
      title.toLowerCase().includes(searchValueLower)
    );
  });

  return (
    <div>
      <TextField
        label="Search"
        value={searchValue}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>S.N.</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((event: any, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>{event.name}</StyledTableCell>
                <StyledTableCell>{event.start}</StyledTableCell>
                <StyledTableCell>{event.end}</StyledTableCell>
                <StyledTableCell>{event.title}</StyledTableCell>
                <StyledTableCell>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
      );
};

export default UserEventlist;

