import styled from "styled-components";

export const FloatContainer = styled.div`
  display:flex;
  position: fixed;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
  padding: ${props => props.padding};
  z-index: 4;
`