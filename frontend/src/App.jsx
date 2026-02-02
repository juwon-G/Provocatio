import React from 'react'
import Header from './components/Header'
import Home from './pages/Home'

export default function App(){
  return (
    <div>
      <Header />
      <main style={{padding: '1rem'}}>
        <Home />
      </main>
    </div>
  )
}
