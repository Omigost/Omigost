import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

import Header from '../Header.jsx';

test('Snapshot test of Header', () => {
    const component = shallow(
        <Header />
    );

    expect(toJson(component, {
        mode: 'shallow'
    })).toMatchSnapshot();
});