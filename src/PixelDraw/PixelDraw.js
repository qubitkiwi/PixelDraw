import React, { useState, useEffect } from "react";
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    Button,
    Box,
    Card,
    CardContent,
    Stack,
} from '@mui/material';
import BitMapping from "./PixelMap";
import styles from "./PixelDraw.module.css";

const PixelDraw = () => {

    const [ table, setTable ] = useState({
        col: 5,
        row: 7,
    });

    const [decimal, setDecimal] = useState(16);

    const emptyBoard = (row, col) =>
        Array.from(new Array(row), () =>
        Array.from(new Array(col), () => (false))
    );

    const [board, setBoard] = useState(emptyBoard(table.row, table.col));
    const [binary, setBinary] = useState(new Array(table.row).fill(0));

    const onChangeTable = ({ target }) => {
        const newInput = { ...table };
        newInput[target.name] = parseInt(target.value, 10);
        setTable(newInput);
    };
    
    useEffect(() => {
        setBoard(emptyBoard(table.row, table.col));
        setBinary(new Array(table.row).fill(0));
    }, [table]);

    const onChangeDecimal = ({ target  }) => {
        setDecimal(parseInt(target.value, 10));
    }; 


    const deepClone = (obj) => {
        if (obj === null) return null;
        const clone = { ...obj };
        Object.keys(clone).forEach((key) => {
          clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key];
        });
        if (Array.isArray(obj)) {
          clone.length = obj.length;
          return Array.from(clone);
        }
        return clone;
    };
      
    const handleClick = (row, col) => {
        const newBoard = deepClone(board);
        const bit = newBoard[row][col];
        newBoard[row][col] = !newBoard[row][col];
        setBoard(newBoard);

        const newBinary = deepClone(binary);
        const sign = bit ? -1 : 1;
        newBinary[row] += sign*2**(table.col - col -1);

        setBinary(newBinary);
    };

    const reset = ()=> {
        setBoard(emptyBoard(table.row, table.col));
        setBinary(new Array(table.row).fill(0));
    };

    return (
        <div>
            <Box className={styles.box}>
                <Card>
                    <CardContent>
                        <Stack spacing={1}>
                            <TextField 
                                name="col" 
                                type="number" 
                                InputProps={{ inputProps: { min: 1 } }}
                                defaultValue={table.col} 
                                label="가로" 
                                onChange={onChangeTable}
                            />
                            <TextField 
                                name="row" 
                                type="number" 
                                InputProps={{ inputProps: { min: 1 } }}
                                defaultValue={table.row} 
                                label="세로" 
                                onChange={onChangeTable}
                            />

                            <InputLabel id="decimal-label">진수</InputLabel>
                            <Select
                                label="진수"
                                labelId="decimal-label"
                                id="decimal"
                                name="decimal"
                                defaultValue={decimal}
                                autoWidth
                                onChange={onChangeDecimal}
                            >
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                            </Select>
                            <Button  variant="contained" onClick={reset}>reset</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Box>

            <br/>

            <div className={styles.box}>
            <BitMapping 
                        styles={styles}  
                        decimal={decimal}
                        board={board} 
                        binary={binary} 
                        onClick={handleClick}
                    />                
            </div>

        </div>
    );
};

export default PixelDraw;