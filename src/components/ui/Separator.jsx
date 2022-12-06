import styled, {css} from "styled-components";

export const Separator = styled.hr`
  width: 70%;
  margin: 5px;
  border-color: ${props => props.theme.colors.primary};
  justify-self: center;
  align-self: center;
  
  ${props => props.fill && css`
  width: 100%;
  `}
`