import React from 'react';

const Header = ({ position }) => {
  return (
    <header style={{ position: 'absolute', right: '16px' }}>
      <h1 id="Header" class="f5  mid-gray  ">ISS Position: Longitude {position.lng}  | Latitude  {position.lat}</h1>
    </header>
  )
}

export default Header