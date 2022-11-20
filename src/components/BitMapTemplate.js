import React, { useState, useEffect } from "react";
import BitMapping from "./BitMapping";

const BitMapTemplate = () => {

    const [ table, setTable ] = useState({
        col: 5,
        row: 7,
        decimal: 16,
    });

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

    return (
        <div>
            <div onChange={onChangeTable}>
                <input type="number" id="col" name="col" min="1"  defaultValue={table.col}></input>
                <input type="number" id="row" name="row" min="1" defaultValue={table.row}></input>
                <select id="decimal" name="decimal" defaultValue={table.decimal}>
                    <option value= {2} >2</option>
                    <option value={10}>10</option>
                    <option value={16}>16</option>
                </select>
            </div>

            <BitMapping table={table} board={board} binary={binary} onClick={handleClick}></BitMapping>
        </div>
    );
};

export default BitMapTemplate;