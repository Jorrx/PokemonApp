import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import AppRouter from './components/AppRouter'



const queryClient = new QueryClient()
const App = () => {


  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </div>
  )
}

export default App
