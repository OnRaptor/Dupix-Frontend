import React from 'react';
import styled from "styled-components";

const StyledLogo = styled.h1`
  font-size: 130px;
  margin: 10px;
  color: ${props => props.theme.colors.primary};
  background: transparent;
  text-shadow: 0 0 1em #646cffaa;
`

const Logo = (props) => {
    return (
        <StyledLogo {...props}/>
    );
};

export default Logo;