import React from 'react';
import styled from "styled-components";
import {BaseElement} from "./Base.jsx";

const StyledTextBox = styled.input`
  ${props => BaseElement(props)}
  will-change: filter;

  &:focus{
    outline: 0;
  }
  
  &::placeholder{
    color: gray;
  }
`

const TextBox = (props) => {
    return (
        <StyledTextBox {...props}/>
    );
};

export default TextBox;