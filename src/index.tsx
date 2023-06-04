import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import store from './app/store'
import { Provider } from 'react-redux'
import Contacts from './routes/contacts';
import Maps from './routes/maps';
import { QueryClient, QueryClientProvider } from 'react-query';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/maps",
    element: <Maps />,
  },
]);

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className='flex min-h-screen'>
          <Sidebar />
          <div className='pb-20 md:pb-0 md:pl-24 w-full min-h-screen bg-green-200'><RouterProvider router={router} /></div>
        </div>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
