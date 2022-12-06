import React from 'react';
import styled from "styled-components";
import Text from "./Text";

const StyledRadioButton = styled.input.attrs({
    type:'radio'
})`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.accent};
  cursor: pointer;
  outline: none;

  &:checked{
    background-color: ${props => props.theme.colors.accent};
  }
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`


const RadioButton = ({children, props}) => {
    return (
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', minWidth:'80px'}}>
            <StyledRadioButton {...props}/>
            <Text>{children}</Text>
        </div>
    );
};

export default RadioButton;