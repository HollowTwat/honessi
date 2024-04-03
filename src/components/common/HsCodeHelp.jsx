import React, {useEffect, useState} from 'react';
import {Box, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {hsCodes} from "../../constants/hsCode/hsCodes";
import Input from "../UI/Input";
import Fuse from 'fuse.js';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '90%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    boxShadow: 24,
    padding: 1,
    borderRadius: 5,
    textAlign: 'justify',
    maxHeight: '80%',
    overflow: 'auto'
};

const HsCodeHelp = ({type}) => {

    const [openInfo, setOpenInfo] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(hsCodes[type]);

    useEffect(() => {
        const fuseOptions = {
            keys: ['text'],
            threshold: 0.4,
        };

        if (!searchQuery) {
            setFilteredData(hsCodes[type])
        } else {
            const fuse = new Fuse(hsCodes[type], fuseOptions);
            const results = fuse.search(searchQuery);
            setFilteredData(results.map(result => result.item));
        }
    }, [searchQuery, type]);

    const handleSearchChange = (value) => {
        setSearchQuery(value.toLowerCase());
    };

    return (
        <div>
            <div onClick={() => setOpenInfo(!openInfo)}>Открыть подсказку</div>

            <Modal open={openInfo} onClose={() => setOpenInfo(!openInfo)}>
                <Box sx={style}>
                    <Input
                        label="Поиск по описанию"
                        value={searchQuery}
                        onChange={(value) => {
                            handleSearchChange(value)
                        }}
                    />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: '100%', height: 'auto' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ width: 'min-content'}}>Код ТН ВЭД</TableCell>
                                    <TableCell>Описание</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th': {border: 0},
                                            backgroundColor: row.value.length === 4 ? 'lightgrey' : 'inherit'
                                        }}
                                    >
                                        <TableCell style={{ width: 'min-content' }}>{row.value}</TableCell>
                                        <TableCell>{row.text}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{margin: 10}}>
                        Так же код можно проверить по&nbsp;
                         <a href="https://www.alta.ru/tnved/?ysclid=ley5fa8rg7766035472" target="_blank" rel="noopener noreferrer">
                            ссылке
                        </a>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default HsCodeHelp;