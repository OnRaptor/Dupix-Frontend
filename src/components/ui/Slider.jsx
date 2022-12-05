import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import Text from "./Text";

const StyledSlider = styled.input.attrs({
    type:'range'
})`
  -webkit-appearance: none;
  margin-right: 15px;
  width: 200px;
  height: 5px;
  border-radius: 5px;
  background-image: linear-gradient(
          ${props => props.theme.colors.primary},
          ${props => props.theme.colors.accent}
  );
  background-repeat: no-repeat;
  background-size: 0 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.primary};
    cursor: ew-resize;
    opacity: 100%;
  }
  
  input[type=range]::-webkit-slider-runnable-track  {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
  }
`

const Slider = (props) => {
    const [input, setInput] = useState(0)

    function handleInputChange(e) {
        let target = e.target
        const min = target.min
        const max = target.max
        const val = target.value
        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
        setInput(val)
    }

    return (
        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <StyledSlider {...props} value={input} onInput={handleInputChange}/>
            <Text width='50px'>{input}</Text>
        </div>
    );
};

export default Slider;