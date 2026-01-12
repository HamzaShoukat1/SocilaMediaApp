import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { Provider } from "react-redux"
// import { persistor, Store } from './State/Store.ts'
import { router } from './Routes/Routes.tsx'
import { RouterProvider } from 'react-router-dom'
// import { PersistGate } from 'redux-persist/integration/react'







createRoot(document.getElementById('root')!).render(
  <StrictMode>

    {/* <Provider store={Store}> */}
      {/* <PersistGate loading={null} persistor={persistor}> */}


        <RouterProvider router={router} />
      {/* </PersistGate> */}
    {/* </Provider> */}

  </StrictMode>,
)
