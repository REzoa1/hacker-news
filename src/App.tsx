import { Route, Switch } from "react-router-dom";
import "./App.css";
import { MainPage } from "./pages/MainPage/MainPage";
import { StoryPage } from "./pages/StoryPage/StoryPage";

export const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/:newsId" component={StoryPage} />
    </Switch>
  );
};

export default App;
