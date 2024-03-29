import React from 'react';

const DiamondFigures = () => {
  const figureStyles = {
    '--size': '15vmin',
    '--duration': '4s',
    '--direction': '1',
    '--pull': '-1.25',
    '--hs': '225 100%',
    '--transform-start': 'translate3d(calc(cos(var(--deg)) * var(--radius)), calc(sin(var(--deg)) * var(--radius)), 0) rotate(calc(var(--deg)))',
  };

  return (
    <figure style={figureStyles}>
      {[...Array(12).keys()].map((_, index) => (
        <div
          key={index}
          style={{
            '--i': index + 1,
            '--radius': 'calc(var(--size) / 2)',
            '--deg': `calc(${(index + 1) * (360 / 12)}deg)`,
          }}
        />
      ))}
    </figure>
  );
};

export default DiamondFigures;
