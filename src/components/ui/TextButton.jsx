import React from 'react';
import styled, {css} from "styled-components";

const StyledTextButton = styled.button`
  border: none;
  color: ${props => props.color || props.theme.colors.accent};
  background-color: transparent;
  padding: 4px;
  margin: 3px;
  font-size: 18px;
  display: flex;
  justify-content: center;
  
  ${props => props.menu && css`
    margin: 0;
    &:hover{
      background-color: ${props => props.theme.colors.hover};
      border-radius: 0;

      &:first-of-type{
        border-radius: 15px 15px 0 0;
      }

      &:last-of-type{
        border-radius: 0 0 15px 15px;
      }
    }
    
    &:active{
      transform: translate(0, 3%);
    }
  `}

  ${props => props.default && css`
    margin: 0;
    &:hover{
      background-color: ${props => props.theme.colors.hover};
      border-radius: 15px;
    }

    &:active{
      transform: translate(0, 3%);
    }
  `}
  
  svg{
    width: 20px;
    height: 20px;
  }
`

const ContentLayout = styled.div`
  width: 130px;
  display: flex;
  justify-content: start;
  
  *{
    margin: 0 6px 0 0;
  }
`

const TextButton = (props) => {
    return (
        <StyledTextButton {...props}>
            <ContentLayout>
                {props.icon && props.icon}
                {props.children}
            </ContentLayout>
        </StyledTextButton>
    );
};

export default TextButton;