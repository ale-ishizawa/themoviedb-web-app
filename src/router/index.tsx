import { createBrowserRouter } from 'react-router-dom'
import { Home, MovieDetail } from '@/pages'
import { ROUTES } from '@/utils/constants'

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home />,
  },
  {
    path: ROUTES.MOVIE_DETAILS,
    element: <MovieDetail />,
  },
])
