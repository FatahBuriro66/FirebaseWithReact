import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, removeItem } from '../store/slices/todo.slice'
import WithLoading from '../hoc/WithLoading'

const Button = ({ handleClick }) => {
  return <button onClick={() => handleClick()}>CLICK ME HOC</button>
}

const ButtonWithLoading = WithLoading(Button)
console.log(ButtonWithLoading);


function Home() {
  const { todos } = useSelector((state) => state.todo)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)


    dispatch(addItem({ title: formData.get('todo') }))

  }

  const handleBtnClick = () => {
    setIsLoading(true)
  }

  return (
    <div>
      <ButtonWithLoading isLoading={isLoading} handleClick={handleBtnClick} />
      <Button />
      <form onSubmit={handleSubmit}>
        <input type="text" name='todo' />
        <button type='submit'>ADD TODO</button>
      </form>

      <ul>
        {
          todos.map(todo => (
            <li key={todo.id}>
              {todo.title}
              <button onClick={() => {
                dispatch(removeItem({ id: todo.id }))
              }}>X</button>
              <button onClick={() => {

              }}>Edit</button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Home