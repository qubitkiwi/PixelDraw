// import PropTypes from 'prop-types';

const PixelMap = ({styles, decimal, board, binary, onClick}) => {
    const prefix = (num) => {
        if (num === 2)
            return "0b";
        else if (num === 16)
            return "0x";
    };

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
            {prefix(decimal)}
            {parseInt(binary[i], 10).toString(decimal)}
        </div>   
    </div>
));


    return (
        <div className={styles.board}>
        {jsx}
        </div>
    );
};

// PixelMap.propTypes = {
//     // table: PropTypes, 
//     board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired, 
//     onClick: PropTypes.func.isRequired,
// };

export default PixelMap;