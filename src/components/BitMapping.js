// import PropTypes from 'prop-types';

const BitMapping = ({styles, table, board, binary, onClick}) => {
  const jsx = board.map((row, i) => (
    <div className={styles.nowrap}>
        {row.map((item, j) => (
            <button 
                key={`${i},${j}`} 
                type="button"
                className={item ? styles.black : styles.white}
                onClick={() => onClick(i, j)}
            >
                {item ? 1:0}
            </button>
        ))}
        <div className={styles.hex}>
            0x
            { parseInt(binary[i], 10).toString(table.decimal)}
        </div>   
    </div>
));


    return (
        <div className={styles.board}>
        {jsx}
        </div>
    );
};

// BitMapping.propTypes = {
//     // table: PropTypes, 
//     board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired, 
//     onClick: PropTypes.func.isRequired,
// };

export default BitMapping;