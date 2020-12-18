import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import ActionButton from './ActionButton';


it('the menu is only displayed when the row is selected', ()=>{
  const hidden = renderer.create(<ActionButton isItemSelected={false}  />).toJSON();
  expect(hidden).toMatchSnapshot();
  const shown = renderer.create(<ActionButton isItemSelected={true}  />).toJSON();
  expect(shown).toMatchSnapshot();
})
it('opens the menu when side button is clicked', async ()=>{
  render(<ActionButton isItemSelected={true} />)
  fireEvent.click(screen.getByTestId('menuArrow'))
  expect(screen.getByText('Remove')).toBeTruthy()

})