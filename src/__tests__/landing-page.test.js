import React from 'react';
import { shallow, mount } from 'enzyme';
import '../components/utils/configureTests';
import { LandingPage } from '../components/elements/landing-page';

//smoke test
describe('<LandingPage /> component', () => {
  it('Smoke test', () => {
    shallow(<LandingPage />);
  });
});

//state


//props

//eventListeners


//hasClass <- rare