import Login from "./Login";
import Dashboard from "./Dashboard";

const access_token = new URLSearchParams(window.location.search).get(
  "access_token"
);

function App() {
  return (
    <div className="App">
      {access_token ? <Dashboard access_token={access_token} /> : <Login />}
    </div>
  );
}

export default App;
