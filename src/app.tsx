import { useState } from 'preact/hooks'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './app.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ArticleListPage from './pages/ArticlesListPage'
import ArticlePage from './pages/ArticlePage'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <h1>Fullstack App Built with Vite + Preact</h1>
      <div className ="page-body" class="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          A simple blog app based on a LinkedInLearning Course, but in Preact and Vite
        </p>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/articles" element={<ArticleListPage/>}/>
          <Route path="/articles/:articleId" element={<ArticlePage/>}/>
        </Routes>
      </div>
      {/* <p class="read-the-docs">
        Click on the Vite and Preact logos to learn more
      </p> */}
    </BrowserRouter>
  )
}
