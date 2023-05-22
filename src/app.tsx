import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './app.css'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ArticleListPage from './pages/ArticlesListPage'
import ArticlePage from './pages/ArticlePage'
import NavBar from './NavBar'

export function App() {
  return (

    <BrowserRouter>
    <div className="App">  
        <NavBar/>
        <div id="page-body">
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/articles" element={<ArticleListPage/>}/>
            <Route path="/articles/:articleId" element={<ArticlePage/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}
