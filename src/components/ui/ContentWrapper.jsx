import styled from "styled-components";

export const ContentWrapper = styled.div`
    display:flex;
    width: 500px;
    flex-direction: column;
    justify-content: ${props => props.justify  || "center"};
    align-items:  ${props => props.align || "center"};
    animation:alpha 3s ease 1;
    margin-top: ${props => props.justify === "start" && '25px'};
  
    @keyframes alpha {
      from { filter:opacity(0%) }
      to { filter:opacity(100%) }
    }
  `