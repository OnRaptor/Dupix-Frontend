import React from 'react';
import styled, {css} from "styled-components";
import {BaseElement} from "./Base.jsx";
import {FlexContainer} from "./containers/FlexContainer";

const StyledButton = styled.button`
  ${props => BaseElement(props)}
  cursor: pointer;
  will-change: filter;
  justify-content: center;


  &:active{
    transition: border-color 1s;
    border-color: ${props => props.theme.colors.accent};
    transform: translate(0, 3%);
  }

  &:hover{
    background-color: ${props => props.theme.colors.primary};
    transition: background-color 500ms;
    filter: drop-shadow(0 0 2em ${props => props.theme.colors.primary});
    color: ${props => props.theme.colors.accent};
  }
  
  ${props => props.filled && css`
    background-color: ${props.theme.colors.accent};
    color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.accent};

    &:hover{
      border-color: ${props => props.theme.colors.primary};
      background-color: ${props => props.theme.colors.accent};
      color: ${props => props.theme.colors.primary};
    }
    
  `}
  
  ${props => props.menu && css`
    border-color: transparent;
    margin: 0;
    border-radius: 0;

    &:first-of-type{
      border-radius: 15px 15px 0 0;
    }

    &:last-of-type{
      border-radius: 0 0 15px 15px;
    }

    &:hover{
      border-color: ${props => props.theme.colors.primary};
      transition: none;
      filter: none;
    }
  `}
  
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