// import PropTypes from 'prop-types';

const BitMapping = ({table, board, binary, onClick}) => {
  const jsx = board.map((row, i) => (
    <div>
        {row.map((item, j) => (
            <button 
                key={`${i},${j}`} 
                type="button"
                onClick={() => onClick(i, j)}
            >
                {item ? 1:0}
            </button>
        ))}
        { parseInt(binary[i], 10).toString(table.decimal)}
    </div>
));


    return (
        <div>
            
            <p>{table.col}</p>
            <p>{table.row}</p>
            <p>{table.decimal}</p>
            <p>{board[0][0] ? 1 : 0}</p>
            
            <div>
            {jsx}
            </div>

        </div>
    );
};

// BitMapping.propTypes = {
//     // table: PropTypes, 
//     board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired, 
//     onClick: PropTypes.func.isRequired,
// };

export default BitMapping;