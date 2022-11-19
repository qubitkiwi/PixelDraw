import React, { useState } from "react";
import BitMapping from "./BitMapping";

const BitMapTemplate = () => {
    const [ table, setTable ] = useState({
        col: 5,
        row: 7,
        decimal: 16,
    });

    Array.matrix = function (m, n, initial) {
        var a, i, j, mat = [];
        for (i = 0; i < m; i += 1) {
            a = [];
            for (j = 0; j < n; j += 1) {
                a[j] = {bit : initial};
            }
            mat[i] = a;
        }
        return mat;
    };

    const [board, setBoard] = useState(Array.matrix(table.row, table.col, false));
    // const [board, setBoard] = useState(emptyBoard(table.row, table.col, false));

    // const emptyBoard = (row, col) =>
    //     Array.from(new Array(row), () =>
    //     Array.from(new Array(col), () => (false))
    // );

    const onChangeTable = (e) => {
        setTable({
            ...table,
            [e.target.name]: e.target.value,
        });
        // setBoard(emptyBoard(table.row, table.col, false));
        setBoard(Array.matrix(table.row, table.col, false));
    };

    function clone(source) {
        var target = {};
        for (let i in source) {
          if (source[i] != null && typeof source[i] === "object") {
            target[i] = clone(source[i]); // resursion
          } else {
            target[i] = source[i];
          }
        }
        return target;
      }
      
    const handleClick = (row, col) => {
        const newBoard = clone(board);
        const select = newBoard[row][col];
        select.bit = !select.bit;
        setBoard(newBoard);
    };

    console.log(board[0]);
    console.log(board[0][1].bit);

    return (
        <div>
            <div onChange={onChangeTable}>
                <input type="number" id="col" name="col" min="1"  value={table.col}></input>
                <input type="number" id="row" name="row" min="1" value={table.row}></input>
                <select id="decimal" name="decimal">
                    <option value= {2} >2</option>
                    <option value={10}>10</option>
                    <option value={16} selected>16</option>
                </select>
            </div>

            <BitMapping table={table} board={board} onClick={handleClick}></BitMapping>
        </div>
    );
};

export default BitMapTemplate;