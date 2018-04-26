import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  color: white;
  position: fixed;
  font-family: 'Alegreya Sans SC', sans-serif;
  font-weight: 100;
  bottom: 0;
  width: 100%;
  background-color: black;
  height: 50px;
`;
const Footer = () => {
  return (
    <FooterWrapper>
      <h5>
        &copy; Ollida 2018
      </h5>
    </FooterWrapper>
  );
}

export default Footer;