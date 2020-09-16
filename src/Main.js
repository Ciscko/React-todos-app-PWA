import React, { useEffect } from 'react';
const Main = (props) => {
    const filters = ['all', 'active', 'done']
    const [todos, setTodos] = React.useState([
        { title: 'Learn Jest Testing', status: 'active' },
        { title: 'Learn React Native', status: 'active' },
        { title: 'Learn Django', status: 'done' }
    ])
    const [filter, setFilter] = React.useState(filters[0])
    const [filteredTodos, setFiltered] = React.useState([])
    const [input , setInput ] = React.useState('')

    const filterTodos = (item) => {
        setFilter(item)
        switch (item) {
            case 'all': setFiltered(() => {
                return todos
            })
                break;
            case 'done': setFiltered(() => {
                return todos.filter(todo => todo.status === 'done')
            })
                break;
            case 'active': setFiltered(() => {
                return todos.filter(todo => todo.status === 'active')
            })
                break;
            default:
                return todos
        }
    }
    const removeTodo = (mytodo) => {
        setTodos([...todos.filter(todo => todo.title !== mytodo)])
    }

    const toggleTodo = (mytodo) => {
        setTodos([...todos.map(todo => {
            if(todo.title === mytodo){
                return {
                    title: mytodo, status : todo.status === 'active' ? 'done' : 'active'
                }
            }else{
                return todo
            }
        })])
    }

    const addTodo = e => {
        if(e.key === 'Enter' && input !== ''){ 
            setTodos([...todos, { title:input, status:'active'} ])
            setInput('')
         }      
    }
    useEffect(() => {
        filterTodos(filter)
    }, [filter, todos])
    return (
        <div className="container">
            <div className="section">
                <div className="center">
                    <h5 className="teal-text">TODO APP</h5><hr></hr>
                </div>
                <div className='row'>
                    <div className="col l4 m4 s12">
                        <ul className="collection">
                            {
                                filters.map(filt =>
                                    <li key={filt} className="btn waves-effect" onClick={() => filterTodos(filt)} className={`collection-item ${filt === filter ? 'white-text purple' : ''}`}>
                                        {filt.toString().toUpperCase()}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                        <div className="input-field  col l8 m8 s12">
                            <label className="active" htmlFor="todo">Enter todo...</label>
                            <input 
                            onChange={(e) => setInput(e.target.value)}
                            onKeyUp = {addTodo}
                            value={input}
                            type="text" name="todo" id="todo" /><br></br>
                        </div>
                </div>
                <div className="center">
                    <h5 className="teal-text">{`${filter.toString().toUpperCase()} TODOS`}</h5>
                </div>
                <ul className="collection">
                    {
                        filteredTodos.length > 0 ? filteredTodos.map(todo => {
                            return (
                                <li onDoubleClick={ () => toggleTodo(todo.title)  } style={todo.status ==='done' ? {textDecorationLine:'line-through'} : {}} className="collection-item" key={todo.title}>{`${todo.title} -- ${todo.status}`}
                                    <button onClick={ () => removeTodo(todo.title) } className="red white-text right" style={{borderRadius:'3px', border:'green', padding:'5px'}}> Delete </button>
                                </li>
                            )
                        })
                            :
                            <li className="collection-item">No todos available yet!</li>
                    }
                </ul>
            </div>
        </div>
    );
}

export default Main;