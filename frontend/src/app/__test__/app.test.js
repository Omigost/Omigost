import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

import AppRoot from 'components/AppRoot/AppRoot.jsx'

test('Snapshot test of App main component', () => {
    const component = mount(
        <AppRoot />
    );

    expect(toJson(component, {
        mode: 'deep'
    })).toMatchSnapshot();
});