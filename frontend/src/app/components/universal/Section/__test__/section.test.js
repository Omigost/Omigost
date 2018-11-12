import React from 'react';
import renderer from 'react-test-renderer';

import Section from '../Section.jsx';

test('Snapshot test of Section', () => {
    const component = renderer.create(
        <Section
            title='My Section!'
            id='mysectionid'
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});