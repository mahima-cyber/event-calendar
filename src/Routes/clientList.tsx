import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name: string,
  lastName: string,
  email: string,
) {
  return { name, lastName, email };
}

const rows = [
  createData('Brad', 'Pitt', 'brad@gmail.com'),
  createData('Adam', 'Cohen', 'adam@gmail.com'),
  createData('Angela', 'Simpson', 'Angela@gmail.com'),
];

export default function ClientList() {
  const [data, setData] = React.useState<any>([]);

  React.useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, []);

  const handleDelete = (index: any) => {
    const newData = [...data]; 
    newData.splice(index, 1);
    setData(newData); 
    localStorage.setItem('userData', JSON.stringify(newData));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>So.No.</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Last name</StyledTableCell>
            <StyledTableCell align="right">Cont Info</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {index}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.lastName}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <Button variant="contained">Delete</Button>
            </StyledTableRow>
          ))}
          {data.map((row: any, index: number) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {index + 3}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.lastName}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>
              <Button variant="contained" onClick={() => handleDelete(index)}>Delete</Button>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
