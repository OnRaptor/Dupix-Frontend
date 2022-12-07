import React, {useEffect, useRef, useState} from 'react';
import styled, {css} from "styled-components";

const StyledSidebar = styled.div`
  position: sticky;
  top: 60px;
  
  ${props => props.muted && css`
    background-color: ${props => props.theme.colors.sidebar};
    margin: 50px 10px 0 0;
    width: 200px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    border-radius: 15px;
    outline: 1px solid ${props => props.theme.colors.hover};
  `}

  ${props => props.outlined && css`
    background-color: transparent;
    margin: 50px 0 0 10px;
    width: 300px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    border-radius: 15px;
    border: 1px solid ${props => props.theme.colors.primary};
  `}
`

const Sidebar = props => {
    return (
        <StyledSidebar {...props}>
            {props.children}
        </StyledSidebar>
    );
};

export default Sidebar;