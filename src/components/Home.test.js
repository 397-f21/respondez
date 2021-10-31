import React from 'react'
import {render, cleanup} from '@testing-library/react'
import Home from './Home'
import { BrowserRouter } from 'react-router-dom';

 afterEach(cleanup)

 it('render button on home', () => {
    const { getByTestId } = render( 
    <BrowserRouter>
        <Home/>
    </BrowserRouter>
    );
    const button = getByTestId("createFormButton");
    expect(button).toBeTruthy();

  });