import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DetailBook from './pages/DetailBook'
import DefaultLayout from './layout/DefaultLayout'
import UrlContext from './context/UrlContext'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar } from '@fortawesome/free-solid-svg-icons'
library.add(faStar)

function App() {
  const moviesUrl = 'http://localhost:3000/movies'
  return (
    <UrlContext.Provider value={{ moviesUrl }}>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/'>
              <Route index element={<Home />}></Route>
              <Route path=':id' element={<DetailBook />}></Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UrlContext.Provider>
  )
}

export default App
