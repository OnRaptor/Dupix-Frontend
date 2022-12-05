import React from 'react';
import styled, {css} from "styled-components";

const StyledCircularProgress = styled.div`
  width: 35px;
  height: 35px;
  border-width: 3px;
  border-style: inset;
  border-radius: 50%;
  border-color: ${props => props.theme.colors.primary};
  background-color: transparent;
  animation:spin 1s linear infinite;

  ${props => props.small && css`
    width: 17px;
    height: 17px;
  `}
  
  @keyframes spin {
    100% {
      transform:rotate(360deg);
    }
  }
`

const CircularProgress = (props) => {
    return (
        <StyledCircularProgress {...props}/>
    );
};

export default CircularProgress;