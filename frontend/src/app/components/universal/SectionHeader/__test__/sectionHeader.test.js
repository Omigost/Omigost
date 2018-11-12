import React from 'react';
import renderer from 'react-test-renderer';

import SectionHeader from '../SectionHeader.jsx';

test('Snapshot test of SectionHeader', () => {
    const component = renderer.create(
        <SectionHeader
            title='My Section!'
            icon='www.google.com'
            sectionId='mysectionid'
        />
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});