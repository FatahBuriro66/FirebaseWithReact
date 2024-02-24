import React from 'react'

function WithLoading(Component) {
  return function ButtonWithLoading({ isLoading, handleClick }) {
    if (isLoading) return <button>Loading ...</button>
    return <Component handleClick={handleClick} />
  }
}

export default WithLoading