import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

import HeaderBar from '../HeaderBar.jsx';

test('Snapshot test of Header', () => {
    const component = shallow(
        <HeaderBar />
    );

    expect(toJson(component, {
        mode: 'shallow'
    })).toMatchSnapshot();
});