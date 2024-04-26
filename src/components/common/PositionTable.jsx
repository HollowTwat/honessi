import React from 'react';
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ModeEdit} from "@mui/icons-material";
import {columnsNames} from "../../constants/positionTable/ColumnsNames";
import {keysFields} from "../../constants/positionTable/KeysFields";

import {theme, themestate} from '../../styles/theme'; //new

const PositionTable = ({typeTable = '', values, onClickDelete = () => {}, onClickEdit = () => {}}) => {

    const keys = keysFields[typeTable]
    const columnsName = columnsNames[typeTable]

    return (
        <TableContainer component={Paper} sx={{backgroundColor: 'var(--tg-theme-bg-color)', color:theme[themestate].text}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {columnsName.map((columnName) => (
                            <TableCell align="left">{columnName}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {values.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell>{index+1}</TableCell>
                            {keys.map((key) => (
                                key === 'position' ? (
                                    typeTable === 'shoes' || typeTable === 'clothes' ? (
                                    <TableCell align="left">
                                        {row[key].map((position) => (
                                            `${position.size}/${position.count}\n`
                                        ))}
                                    </TableCell>
                                    ) : (
                                        <TableCell align="left">
                                            {row[key].map((position) => (
                                                `${position.x}*${position.y}/${position.count}\n`
                                            ))}
                                        </TableCell>
                                    )
                                ) : key === 'materials' && typeTable === 'clothes' ? (
                                    <TableCell align="left">
                                        {[...row[key], ...row['userMaterials']].join(',\n')}
                                    </TableCell>
                                ) : key === 'set' && typeTable === 'underwear' ? (
                                        <TableCell align="left">
                                            {row[key] ? "Да" : "Нет"}
                                        </TableCell>
                                    ) :
                                    <TableCell align="left">{row[key]}</TableCell>
                            ))}
                            <TableCell key={index} align="left">
                                <IconButton onClick={() => {onClickEdit(index)}}>
                                    <ModeEdit/>
                                </IconButton>
                            </TableCell>
                            <TableCell key={index} align="left">
                                <IconButton onClick={() => {onClickDelete(index)}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default PositionTable;
