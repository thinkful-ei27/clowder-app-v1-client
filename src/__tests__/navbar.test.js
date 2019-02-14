import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import '../components/utils/configureTests';
import { NavBar } from '../components/elements/navbar';

//smoke test
describe('<Navbar /> component', () => {
  it('Smoke test', () => {
    shallow(<NavBar />);
  });


  //state


  //props

  //eventListeners
  it('includes link to userSettings', () => {
    const wrapper = shallow(<MemoryRouter><NavBar /></MemoryRouter>);
    expect(wrapper.find(Link).props().to).toBe('/edit-user-settings');
  });

  //hasClass <- rare}
});