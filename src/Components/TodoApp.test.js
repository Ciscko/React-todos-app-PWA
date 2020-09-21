import React from 'react';
import { render, screen, waitForElementToBeRemoved, fireEvent } from '@testing-library/react'
import TodoApp from './TodoApp'
import { getTodos } from './todos'
import { act } from 'react-dom/test-utils';

jest.mock("./todos")

beforeEach(() => {
    getTodos.mockImplementation(() => Promise.resolve({todos : [
        { title: 'Learn Jest Testing', status: 'active' },
        { title: 'Learn React Native', status: 'active' },
        { title: 'Learn Django', status: 'done' }
    ]}))
})
describe("<TodoApp/>", () => {
    test('Renders all texts in first render', async () => {
        //Arrange
        act(() => render(<TodoApp/>)) 
        let heading = screen.getByText(/TODO APP/)
        let subheader =  screen.getByText(/ALL TODOS/)
        let categoryTwo = screen.getByText(/ACTIVE/)
        let categoryThree = screen.getByText(/DONE/)
        let footer  = screen.getByText(/TODOS APP/)
        await waitForElementToBeRemoved(() => screen.getByText(/Loading.../))
        let inputLabel = screen.getByText(/Enter todo.../)
        let tapHeader = screen.getByText('How to use') 
        let tapContent =  screen.getByText('Double tap a todo item to mark as Done/Completed or Active/Uncompleted. To remove item click delete. To add an item: type it and hit Enter! Hurray!') 
       // screen.debug()
        //Act
    
        //Assert
        expect(heading).toBeInTheDocument()
        expect(categoryTwo).toBeInTheDocument()
        expect(categoryThree).toBeInTheDocument()
        expect(subheader).toBeInTheDocument()
        expect(footer).toBeInTheDocument()
        expect(inputLabel).toBeInTheDocument()
        expect(tapHeader).toBeInTheDocument()
        expect(tapContent).toBeInTheDocument()
    })

    test('Adds new todo', async() => {
        //Arrange
        let inputVal = 'Learn Autocad electrical'
        getTodos.mockImplementation(() => Promise.resolve({todos : [
            { title: 'Learn Jest Testing', status: 'active' },
            { title: 'Learn React Native', status: 'active' },
            { title: 'Learn Django', status: 'done' },
            { title: inputVal, status: 'active' }
        ]}))
        act(() => render(<TodoApp/>))
       
        let inputElement = screen.getByTestId(`todoinput`)
        //Assert
        expect(inputElement).toBeInTheDocument()
        //Act
        act(() => {
            fireEvent.change(inputElement, { target: { value : inputVal }} )
            fireEvent.keyDown(inputElement, { key:"Enter"})
        })
        //Assert
        await screen.findByText(`${inputVal} -- active`)
        await expect(screen.getByTestId(`todoinput`)).toHaveValue('')

        //expect(screen.findByText(`${inputVal} -- active`)).toBeInTheDocument()
    })

    test('Renders data', async () => {
        act(() => render(<TodoApp/>))
        //Arrange
         let data = await getTodos()
         let todos = data.todos
         //Assert
         todos.map((todo) => {
            expect(screen.getByText(`${todo.title} -- ${todo.status}`)).toBeInTheDocument
         })
    })
})