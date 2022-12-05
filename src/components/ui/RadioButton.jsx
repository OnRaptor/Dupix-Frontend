import React from 'react';
import styled from "styled-components";
import Text from "./Text";

const HiddenRadioButton = styled.input.attrs({
    type:'radio'
})`
  height: 13px;
  width: 13px;
  cursor: pointer;
  position: absolute;
  opacity: 0;
`

const StyledCheckMark = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background-color: transparent;
  pointer-events: none;
  border: 1px solid ${props => props.theme.colors.accent};  
  padding: 2px;

  ${HiddenRadioButton}:checked + && {
    background-color: ${props => props.theme.colors.accent};
  }

  ${HiddenRadioButton}:hover + && {
    border-color: ${props => props.theme.colors.primary};
  }
`


const RadioButton = ({children, props}) => {
    return (
        <div style={{display:'flex', flexDirection:'row', alignItems:'center', minWidth:'60px'}}>
            <HiddenRadioButton {...props}/>
            <StyledCheckMark {...props}/>
            <Text>{children}</Text>
        </div>
    );
};

export default RadioButton;