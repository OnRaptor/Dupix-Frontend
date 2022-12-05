import styled, {css} from "styled-components";
import React from 'react';
import {Link} from "react-router-dom";

const StyledLink = styled(Link)`
  font-size: ${props => props.fontSize || "20px"};
  color: ${props => props.color || props.theme.colors.accent};
  margin: ${props => props.margin || "2px"};
  padding: ${props => props.padding || "2px"};
  text-decoration: none;
  
  ${props => props.primary && css`
    color: ${props.theme.colors.primary};
  `}
  
  &:hover{
    color: ${props => props.theme.colors.primary};
  }
`

export const StyledNavLink = (props) => {
  return (
      <StyledLink {...props} reloadDocument/>
  );
};