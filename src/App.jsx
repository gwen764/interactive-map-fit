import { Routes, Route } from "react-router-dom";

import { SemesterContextProvider } from "@core/context/SemesterContext";
import { AppContextProvider } from "@core/context/AppContext";
import routes from "@core/routes";

import { DefaultPage } from "@pages";

import "App.scss"

function App() {
  return (
    <div className="App">
      <SemesterContextProvider>
        <AppContextProvider>
          <DefaultPage>
            <Routes>
              {routes.map(({
                title,
                component,
                path,
                exact}) =>
                <Route
                  key={path}
                  path={path}
                  exact={exact}
                  element={component}
                  title={title}/>)}
            </Routes>
          </DefaultPage>
        </AppContextProvider>
      </SemesterContextProvider>
    </div>
  );
}

export default App;
