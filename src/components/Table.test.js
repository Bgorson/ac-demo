// Snapshot for sure with Mocked DAta
// Probably Test the sorting feature
import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import Table from './Table';
import {rowMock} from '../mockData'


it('matches the expected shape of the table', ()=>{
  const component = renderer.create(<Table rows={rowMock}  />).toJSON();
  expect(component).toMatchSnapshot();

})

it("sorts the rows when the header is clicked", ()=>{
    render(<Table rows={rowMock} />)
    let value = screen.getAllByTestId("amount")
    expect(value[0].textContent).toEqual('$300')
    fireEvent.click(screen.getByTestId('totalValue'))
    value = screen.getAllByTestId("amount")
   expect(value[0].textContent).toEqual('$150')
})
