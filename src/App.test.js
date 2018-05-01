import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import Footer from './components/Footer';

it('renders without crashing', () => {
  shallow(<Footer />);
});
