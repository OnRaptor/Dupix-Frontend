import React from 'react';
import styled, {css} from "styled-components";
import {BaseElement} from "./Base.jsx";
import {FlexContainer} from "./containers/FlexContainer";

const StyledButton = styled.button`
  ${props => BaseElement(props)}
  cursor: pointer;
  will-change: filter;
  justify-content: center;

  ${props => props.filled && css`
    background-color: ${props.theme.colors.accent};
    color: ${props => props.theme.colors.secondary};
  `}
  
  &:active{
    transition: border-color 1s;
    border-color: ${props => props.theme.colors.accent};
    transform: translate(0, 3%);
  }
  
  &:hover{
    background-color: ${props => props.theme.colors.primary};
    transition: background-color 1s;
    filter: drop-shadow(0 0 2em ${props => props.theme.colors.primary});
  }
  
`

const Button = (props) => {
    return (
        <StyledButton {...props}>
            <FlexContainer justify="center" align="center">
                {props.children}
            </FlexContainer>
        </StyledButton>
    );
};

export default Button;