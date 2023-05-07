import { createContext, useContext, useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'


export const ProductsContext = createContext([])

function App() {

  const [products, setProducts] = useState([]);

  return (
    <ProductsContext.Provider value={[products, setProducts]}>
      <div className='App'>

        <HomePage/>
      </div>
    </ProductsContext.Provider>
  )
}

export default App
