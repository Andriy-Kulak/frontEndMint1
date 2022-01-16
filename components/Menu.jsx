import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

function Menu({ handleNavToggle }) {
  return (
    <StyledMenu>
      <Image alt="rocket" src="/assets/spaceship.png" width={200} height={200} />
      <StyledLink onClick={handleNavToggle} href="#home">Home</StyledLink>
      <StyledLink onClick={handleNavToggle} href="#our-story">Our Story</StyledLink>
      <StyledLink onClick={handleNavToggle} href="#roadmap">Roadmap</StyledLink>
      <CloseToggle onClick={handleNavToggle}>
        <Image alt="exit button" src="/assets/menu-exit-button.png" width={50} height={50} />
      </CloseToggle>
    </StyledMenu>
  );
}

const StyledMenu = styled.h3`
    margin-top: 0;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    background-color: rgb(58, 66, 81, .95);
    z-index: 99;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled.a`
    margin: 10 0 !important;
    cursor: pointer;
    color: #eee;
    background-color: transparent;
    border: 0;
    text-decoration: none;
    font-size: 35px;
    transition: .2s all ease-in-out;
    user-select: none; /* supported by Chrome and Opera */
   -webkit-user-select: none; /* Safari */
   -khtml-user-select: none; /* Konqueror HTML */
   -moz-user-select: none; /* Firefox */
   -ms-user-select: none; /* Internet Explorer/Edge */
    &:hover {
        transition: .2s all ease-in-out;
        color: orangered;
    }
`;

const CloseToggle = styled.button`
    background-color: transparent;
    border: 0;
    position: fixed;
    top: 5%;
    right: 4%;
    padding: .75rem;
    display: flex;
    place-items: center;
    font-size: 2rem;
    cursor: pointer;
`;

export default Menu;
