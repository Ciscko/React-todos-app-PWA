
export const getTodos  = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    todos : [
                        { title: 'Learn Jest Testing', status: 'active' },
                        { title: 'Learn React Native', status: 'active' },
                        { title: 'Learn Django', status: 'done' }
                    ]
                })
            }, 1000)
        })
    }

export const postTodos  = () => {
        return new Promise({status:'Successful'})
    }

    
