import styled from "styled-components";

import React from 'react';

const Layout = styled.div`
  position: relative;
  max-width: 500px;
  max-height: 500px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`

const AmbientLight = styled.img`
  opacity: 0.75; 
  filter: blur(60px);
  position: absolute;
  top: 0;
  left: auto;
  z-index: -1;
  max-width: 100%;
  height: 100%;
  object-fit: contain;
`

export const ImageWrapper = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
`

const ImageAmbientLight = ({src}) => {
    return (
        <Layout>
            <ImageWrapper src={src} alt="image"/>
            <AmbientLight src={src}/>
        </Layout>
    );
};

export default ImageAmbientLight;