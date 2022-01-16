import React from 'react';
import styled from 'styled-components';

import Image from 'next/image';

function Toggle({ handleNavToggle }) {
  return (
    <StyledToggle className="animate__animated animate__fadeInRight" onClick={handleNavToggle}>
      <Image alt="menu" src="/assets/menu-button.png" width={40} height={40} />
    </StyledToggle>
  );
}

const StyledToggle = styled.button`
    position: fixed;
    background-color: transparent;
    border: 0;
    top: 5%;
    right: 4%;
    color: #222;
    padding: .75rem;
    display: flex;
    place-items: center;
    font-size: 2rem;
    cursor: pointer;
`;

export default Toggle;
