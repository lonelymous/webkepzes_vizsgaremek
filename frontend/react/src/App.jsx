import { createContext, useContext, useState } from 'react'
import './App.css'
import HomePage from './components/HomePage'
import NavBar from './components/NavBar'

export const ProductsContext = createContext([])

function App() {

  const [products, setProducts] = useState([]);

  return (
    <ProductsContext.Provider value={[products, setProducts]}>
      <div className='App'>
        <NavBar text="Raktárkezelő rendszer"/>
        <HomePage/>
      </div>
    </ProductsContext.Provider>
  )
}

export default App
