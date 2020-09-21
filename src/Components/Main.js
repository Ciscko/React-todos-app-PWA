import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
import { getTodos } from './todos'

const Main = () => {
    const filters = ['all', 'active', 'done']
    const [ loading, setLoding] = React.useState(true)
    const [todos, setTodos] = React.useState([])
    const [filter, setFilter] = React.useState(filters[0])
    const [filteredTodos, setFiltered] = React.useState([])
    const [input, setInput] = React.useState('')
    const tapRef = React.createRef()
    
    
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
    useEffect(() => {
        getTodos().then(res => setTodos([...res.todos])).then(() => filterTodos(filter)).then(() => setLoding(false))
        M.TapTarget.init(tapRef.current)
    }, [])

    const removeTodo = (mytodo) => {
        setTodos([...todos.filter(todo => todo.title !== mytodo)])
    }

    const toggleTodo = (mytodo) => {
        setTodos([...todos.map(todo => {
            if (todo.title === mytodo) {
                return {
                    title: mytodo, status: todo.status === 'active' ? 'done' : 'active'
                }
            } else {
                return todo
            }
        })])
    }
    
    const addTodo = e => {
        if (e.key === 'Enter' && input !== '') {
            setTodos([...todos, { title: input, status: 'active' }])
            setInput('')
        }
    }
 
    return (
        <>
        <div className="container" style={{paddingBottom:'5%'}}>
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
                            onKeyUp={addTodo}
                            value={input}
                            type="text" name="todo" id="todo" /><br></br>
                    </div>
                </div>
                <div className="center">
                    <h5 className="teal-text">{`${filter.toString().toUpperCase()} TODOS`}</h5>
                </div>
                <ul className="collection">
                    {
                        loading ? <li className="collection-item">Loading...</li> : 
                        filteredTodos.length > 0 ? filteredTodos.map(todo => {
                            return (
                                <li onDoubleClick={() => toggleTodo(todo.title)} style={todo.status === 'done' ? { textDecorationLine: 'line-through' } : {}} className="collection-item" key={todo.title}>{`${todo.title} -- ${todo.status}`}
                                    <button onClick={() => removeTodo(todo.title)} className="red white-text right" style={{ borderRadius: '3px', border: 'green', padding: '5px' }}> Delete </button>
                                </li>
                            )
                        })
                            :
                            <li className="collection-item">No todos available yet!</li>
                    }
                </ul>
            </div>
            <div className="tap-target  purple lighten-2 white-text" ref={tapRef} data-target="menu">
                <div className="tap-target-content">
                    <h5>How to use</h5>
                    <p>Double tap a todo item to mark as Done/Completed or Active/Uncompleted. To remove item click delete. To add an item: type it and hit Enter! Hurray!</p>
                </div>
            </div>
            <a style={{bottom:'8%', position:'fixed'}} id="menu" onClick={() => M.TapTarget.getInstance(tapRef.current).open() } className="waves-effect waves-light btn btn-floating" ><i className="material-icons">menu</i></a>
        </div>
        <footer className="page-footer black center"  style={{bottom:'0%', position:'fixed', width:'100%'}}>
          <div className="container">
            <div className="row">
              TODOS APP
            </div>
          </div>
        </footer>
        </>
        
    );
}

export default Main;