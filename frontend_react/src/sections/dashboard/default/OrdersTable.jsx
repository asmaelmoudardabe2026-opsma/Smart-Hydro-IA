import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { NumericFormat } from 'react-number-format';

// project imports
import Dot from 'components/@extended/Dot';

function createData(tracking_no, name, fat, carbs, protein) {
  return { tracking_no, name, fat, carbs, protein };
}

// Data sample (t9dry t-baddli smyat les produits mn b3d lmsal dynamic 3la 7sab smart clinic / hydro)
const rows = [
  createData(84564564, 'Capteur de débit', 40, 2, 40570),
  createData(98764564, 'Électrovanne', 300, 0, 180139),
  createData(98756325, 'Kit d\'irrigation', 355, 1, 90989),
  createData(98652366, 'Sonde de sol', 50, 1, 10239),
  createData(13286564, 'Routeur Passerelle', 100, 1, 83348),
  createData(86739658, 'Pompe à eau', 99, 0, 410780),
  createData(13256498, 'Contrôleur intelligent', 125, 2, 70999),
  createData(98753263, 'Raccord tuyauterie', 89, 2, 10570),
  createData(98753275, 'Réservoir principal', 185, 1, 98063),
  createData(98753291, 'Filtre à tamis', 100, 0, 14001)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

// ... rest of helper functions stay unchanged
function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = [...array.map((el, index) => [el, index])];
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// 🎨 Trjma dyal les headers d lmsal tableau kāmlyni
const headCells = [
  {
    id: 'tracking_no',
    align: 'left',
    disablePadding: false,
    label: 'N° de Suivi'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Nom du Produit'
  },
  {
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'Commande Totale'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,
    label: 'Statut'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Montant Total'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// 🎨 Trjma dyal les statuts (Pending, Approved, Rejected)
function OrderStatus({ status }) {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'En attente'; // ➔ Pending
      break;
    case 1:
      color = 'success';
      title = 'Approuvé'; // ➔ Approved
      break;
    case 2:
      color = 'error';
      title = 'Refusé'; // ➔ Rejected
      break;
    default:
      color = 'primary';
      title = 'Aucun';
  }

  return (
    <Stack direction="row" sx={{ gap: 1, alignItems: 'center' }}>
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const order = 'asc';
  const orderBy = 'tracking_no';

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.tracking_no}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link sx={{ color: 'secondary.main' }}>{row.tracking_no}</Link>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell>
                    <OrderStatus status={row.carbs} />
                  </TableCell>
                  <TableCell align="right">
                    {/* 🎨 Hna baddelna prefix l DH machi $ (t9dry d-dirī €) */}
                    <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="DH " />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

OrderTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

OrderStatus.propTypes = { status: PropTypes.number };