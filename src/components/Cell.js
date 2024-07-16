import React from 'react';
import './Cell.css';

const Cell = ({ cell, id, handleClick }) => {
  return (
    <div className='square' id={id} onClick={() => handleClick(id)}>
      {cell === 'circle' ? <div className="circle"></div> : cell === 'cross' ? <div className="cross"></div> : null}
    </div>
  );
};

export default Cell;
