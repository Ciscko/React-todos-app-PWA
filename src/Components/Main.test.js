import React from 'react';
import { screen, render } from '@testing-library/react'
import Main from './Main'
import { getTodos } from './todos'
import { act } from 'react-dom/test-utils'

jest.mock('./todos')

beforeEach(() => {
   getTodos.mockImplementation(() => Promise.resolve({
      todos: [
         { title: 'Learn Jest Testing', status: 'active' },
         { title: 'Learn React Native', status: 'active' },
         { title: 'Learn Django', status: 'done' }
      ]
   }))
})

describe('<Main/>', () => {
   act(() => {
      test('Todo app renders correctly and adds todo', () => {
         //Arrange
         render(<Main/>)
      })
   })
})