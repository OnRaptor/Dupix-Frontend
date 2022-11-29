import styled from "styled-components";

export const ContentWrapper = styled.div`
    display:flex;
    width: 500px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation:alpha 3s ease 1;
    @keyframes alpha {
      from { filter:opacity(0%) }
      to { filter:opacity(100%) }
    }
  `