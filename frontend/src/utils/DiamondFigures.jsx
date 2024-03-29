import React from 'react';
import './DiamondFigures.css'; // Assuming your CSS file is named DiamondFigures.css

const DiamondFigures = () => {
  return (
    <div className='items-center justify-center flex translate-y-[-100px]'>
      <figure className="diamond-container">
        <div style={{ '--i': 1}}></div>
        <div style={{ '--i': 2}}></div>
        <div style={{ '--i': 3}}></div>
        <div style={{ '--i': 4}}></div>
        <div style={{ '--i': 5}}></div>
        <div style={{ '--i': 6}}></div>
        <div style={{ '--i': 7}}></div>
        <div style={{ '--i': 8}}></div>
        <div style={{ '--i': 9}}></div>
        <div style={{ '--i': 10}}></div>
        <div style={{ '--i': 11}}></div>
        <div style={{ '--i': 12}}></div>
      </figure>
    </div>
  );
  };  

export default DiamondFigures;
