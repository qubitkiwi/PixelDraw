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

    const [diff, setDiff] = useState({
        col: table.col,
        row: table.row,
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
        const value = parseInt(target.value, 10);
        newInput[target.name] = value;
        setDiff(newInput);
    };

    useEffect(() => {
        if ( Math.abs(table.col - diff.col) === 1 || Math.abs(table.row - diff.row) === 1) {
            update();
        }
    }, [diff]);

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

    const table_copy = (new_table, old_table) => {
        const min_row = new_table.length < old_table.length ? new_table.length : old_table.length;
        const min_col = new_table[0].length < old_table[0].length ? new_table[0].length : old_table[0].length;
        
        for (let i = 0; i < min_row; i++) {
            for (let j=0; j < min_col; j++) {
                new_table[i][j] = old_table[i][j];
            }
        }
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

    const update = ()=> {
        if (diff !== table) {
            const newBoard = emptyBoard(diff.row, diff.col);
            table_copy(newBoard, board);
            setBoard(newBoard);
            setTable(diff);
            calculate_binary();
        }
    };


    const calculate_binary = ()=> {
        const new_binary = new Array(diff.row).fill(0);
        for(let i=0; i<board.length; i++) {
            for (let j=0; j<board[0].length; j++) {
                const sign = board[i][j] ? 1 : 0;
                new_binary[i] += sign*2**(diff.col - j -1);
            }
        }
        setBinary(new_binary);
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
                                onBlur={update}
                            />
                            <TextField 
                                name="row" 
                                type="number" 
                                InputProps={{ inputProps: { min: 1 } }}
                                defaultValue={table.row} 
                                label="세로" 
                                onChange={onChangeTable}
                                onBlur={update}
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
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button variant="outlined" onClick={update}>update</Button>
                                <Button  variant="contained" onClick={reset}>reset</Button>
                            </Box>
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