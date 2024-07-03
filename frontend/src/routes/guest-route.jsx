import Board from '~/pages/Boards/_id'
import Boards from '~/pages/Boards/Boards'
import ListBoards from '~/pages/Boards/ListBoards'

const guestRoute = [
  {
    path: '/',
    element: (
      <h1>
        Welcome to the Board App!, go to <a href="/boards"> boards </a> to continue
      </h1>
    ) // Custom welcome page for guests
  },
  {
    path: '/boards',
    element: <Boards />,
    children: [
      {
        path: '',
        element: <ListBoards />
      },
      {
        path: '/boards/:boardId',
        element: <Board />
      }
    ]
  },
  {
    path: '*',
    element: <h1>Page not found</h1> // Custom 404 page
  }
]

export default guestRoute
