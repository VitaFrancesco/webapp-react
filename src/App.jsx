import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DetailBook from './pages/DetailBook'
import DefaultLayout from './layout/DefaultLayout'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path='/'>
            <Route index element={<Home />}></Route>
            <Route path=':key' element={<DetailBook />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
