import React from 'react';
import styled, {css} from "styled-components";

const TextWrapper = styled.div`
  font-size: ${props => props.fontSize || "20px"};
  color: ${props => props.color || props.theme.colors.accent};
  margin: ${props => props.margin || "2px"};
  padding: ${props => props.padding || "2px"};
  
  ${props => props.primary && css`
    color: ${props.theme.colors.primary};
  `}
  
  ${props => props.animated_alt && css`
    animation: glow 1s ease-in-out infinite alternate;
    @keyframes glow {
      from {
        text-shadow: 0 0 10px #3c2892, 0 0 20px #9f10b4, 0 0 30px #e60073, 0 0 40px #2f03ce, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
      }
      to {
        text-shadow: 0 0 10px #922828, 0 0 20px #b47210, 0 0 30px #17e600, 0 0 40px #03cea9, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
      }
    }
  `}

  ${props => props.animated && css`
    animation: glow_alt 1s ease-in-out infinite alternate;
    @keyframes glow_alt {
      to {
        text-shadow: 0 0 20px #123ece, 0 0 30px #a94dff, 0 0 40px #ff4da6, 0 0 50px #ff0000, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
      }
    }
  `}
`

const LinkWrapper = styled.a`
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

const Text = (props) => {
    if (props.link)
        return (
            <LinkWrapper {...props}/>
        );
    else
        return (
            <TextWrapper {...props}/>
        );
};

export default Text;