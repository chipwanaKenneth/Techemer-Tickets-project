import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from './Header'
import Content from './Content'
import './index.css'

function App () {
  return (
    <>

    <Header />
    <Content />
    </>
  )
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
