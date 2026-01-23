import { RouterProvider } from 'react-router-dom'
import { QueryProvider } from '@/providers'
import { router } from '@/router'

function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}

export default App
