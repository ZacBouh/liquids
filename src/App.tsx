import { Outlet } from "react-router";
import Header from "./Components/Header";
import { RecipesProvider } from "./lib/RecipesContext";

function App() {
  return (
    <>
      <Header />
      <RecipesProvider>
        <Outlet />
      </RecipesProvider>
    </>
  );
}

export default App;
