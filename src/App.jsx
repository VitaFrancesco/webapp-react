import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DetailBook from './pages/DetailBook'
import DefaultLayout from './layout/DefaultLayout'
import UrlContext from './context/UrlContext'

import { useState } from 'react'
import MessageContext from './context/MessageContext'
import LoaderContext from './context/LoaderContext'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faStar, faArrowLeft, faMagnifyingGlass, faPlus, faX, faTrashCan, faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(faStar, faArrowLeft, faMagnifyingGlass, faPlus, faX, faTrashCan, faCircleCheck, faSpinner)

function App() {
  const moviesUrl = 'http://localhost:3000/movies'

  const [message, setMessage] = useState('')
  const [loader, setLoader] = useState(false)

  return (
    <UrlContext.Provider value={{ moviesUrl }}>
      <MessageContext.Provider value={{ message, setMessage }}>
        <LoaderContext.Provider value={{ loader, setLoader }}>


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

        </LoaderContext.Provider>
      </MessageContext.Provider>
    </UrlContext.Provider>
  )
}

export default App