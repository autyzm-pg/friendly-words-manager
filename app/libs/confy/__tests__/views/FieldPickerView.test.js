import 'react-native'
import React from 'react'

import renderer from "react-test-renderer"
import FieldPickerView from "../../components/fields/FieldPickerView";


it("renders at all", () => {
    const tree = renderer.create(
        <FieldPickerView value="" onChange={()=>undefined} verbose="" options={[]} />
    ).toJSON()
    expect(tree).toBeTruthy();
})