import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  color: white;
  position: relative;
  font-family: 'Alegreya Sans SC', sans-serif;
  font-weight: 100;
`;
const Footer = () => {
  return (
    <FooterWrapper>
      <h5>
        &copy; Olidia 2018
      </h5>
    </FooterWrapper>
  );
}

export default Footer;