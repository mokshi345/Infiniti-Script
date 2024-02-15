// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './components/App.jsx';
// import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Toaster} from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <Toaster position='top-right'/>
        <App/>
    </BrowserRouter>
  </React.StrictMode>
)
