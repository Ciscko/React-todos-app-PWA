import React, { useEffect } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js'
import { getTodos } from './todos'

const Main = () => {
    const tapRef = React.createRef()
    const reducer = (state, action ) => {
        switch(action.type){
            case 'LOADING':
                return {
                    ...state, loading : true
                }
            case 'TYPE_INPUT':
                return {
                    ...state, input : action.payload
                }
            case 'LOAD_TODOS':
                return {
                    ...state, todos: [...action.payload], filteredTodos: [...action.payload], loading : false 
                }
            case 'ADD_TODO':
                if(state.filter === 'all' || state.filter === 'active'){
                    return {
                        ...state, input:'', filteredTodos : [...state.todos, action.payload], todos : [...state.filteredTodos, action.payload]
                    }
                }
                return {
                    ...state, todos : [...state.filteredTodos, action.payload]
                }
            case 'TOGGLE_TODO':
                return {
                    ...state, todos : [...action.payload], filteredTodos: [...action.payload]
                }
                
            case 'ERROR':
                return {
                    ...state, error:action.payload
                }
            case 'LOAD_FILTERED':
                return {
                    ...state, filteredTodos : [...action.payload], loading : false 
                }
            case 'SET_FILTER':
                return {
                    ...state, filter : action.payload
                }
            case 'REMOVE_TODO':
                return {
                    ...state, filteredTodos: [...action.payload ], todos: [...action.payload ]              }
             
            default:
                return state
        }
    }

    const [ todoState, dispatchAction] = React.useReducer(reducer, {
        todos : [], input:'', error : '', filteredTodos : [], filters : ['all', 'active', 'done'], filter : 'all'
    })

    const filterTodos = (item) => {
        dispatchAction({type:'SET_FILTER', payload: item })
        switch (item) {
            case 'all': 
                dispatchAction({type:'LOAD_FILTERED', payload: todoState.todos })
                break;
            case 'done': 
                dispatchAction({type:'LOAD_FILTERED', payload: todoState.todos.filter(todo => todo.status === 'done') })
                break;
            case 'active':
                dispatchAction({type:'LOAD_FILTERED', payload: todoState.todos.filter(todo => todo.status === 'active')}) 
                break;
            default:
                dispatchAction({type:'LOAD_FILTERED', payload: todoState.todos })
                return;
        }
    }

    useEffect(() => {
        dispatchAction({type:'LOADING'})
        getTodos().then((mytodos) =>  dispatchAction({type:'LOAD_TODOS', payload: [...mytodos.todos]}))
        M.TapTarget.init(tapRef.current)
    }, [])

    const removeTodo = (mytodo) => {
        dispatchAction({type:'REMOVE_TODO', payload: [...todoState.todos.filter(todo => todo.title !== mytodo)]}) 
    }

    const toggleTodo = (td) => {
        dispatchAction({type:'TOGGLE_TODO', payload:  [...todoState.filteredTodos.map(todo => {
            if (todo.title === td) {
                return {
                    title: td, status: todo.status === 'active' ? 'done' : 'active'
                }
            } else {
                return {...todo}
            }
        })] }) 
    }
   
    const addTodo = e => {
        if (e.key === 'Enter' && todoState.input !== '') {
            dispatchAction({type:'ADD_TODO', payload: { title: todoState.input, status: 'active' } })
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
                                todoState.filters.map(filt =>
                                    <li key={filt} className="btn waves-effect" onClick={() => filterTodos(filt)} className={`collection-item ${filt === todoState.filter ? 'white-text purple' : ''}`}>
                                        {filt.toString().toUpperCase()}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                    <div className="input-field  col l8 m8 s12">
                        <label className="active" htmlFor="todo">Enter todo...</label>
                        <input
                            onChange={(e) => dispatchAction({payload: e.target.value, type:'TYPE_INPUT'})}
                            onKeyUp={addTodo}
                            value={todoState.input}
                            data-testid='todoinput'
                            type="text" name="todo" id="todo" /><br></br>
                    </div>
                </div>
                <div className="center">
                    <h5 className="teal-text">{`${ todoState.filter.toString().toUpperCase()} TODOS`}</h5>
                </div>
                <ul className="collection">
                    {
                       todoState.loading ? <li className="collection-item">Loading...</li> : 
                       todoState.filteredTodos.length > 0 ? todoState.filteredTodos.map(todo => {
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