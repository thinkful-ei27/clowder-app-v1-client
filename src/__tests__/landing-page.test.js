import React from 'react';
import { shallow, mount } from 'enzyme';
import '../components/utils/configureTests';
import { LandingPage } from '../components/elements/landing-page';


let localStorage = {
  setItem: () => { },
  getItem: () => true
};
//smoke test
describe('<LandingPage /> component', () => {

  it('Smoke test', () => {
    mount(<LandingPage />);
  });
});

//state


//props

//eventListeners


//hasClass <- rare