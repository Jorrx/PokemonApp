import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import AppRouter from "./components/AppRouter";

const queryClient = new QueryClient();
const App = () => {
    return (
        <main>
            <QueryClientProvider client={queryClient}>
                <div className="pokemons">
                    <AppRouter />
                </div>
            </QueryClientProvider>
        </main>
    );
};

export default App;
