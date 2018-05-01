import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageNotFoundWrapper = styled.div`
  position: relative;
  height: 100vh;
  background-color: black;
  color: white;
  font-family: 'Alegreya Sans SC', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PageNotFound = () => {
  return (
    <PageNotFoundWrapper>
      <p>Seems like this page doesn't exist :( </p>
      <Link to='/' style={{ color: 'white' }}>Return to Home page </Link>
    </PageNotFoundWrapper>
  );
}

export default PageNotFound;