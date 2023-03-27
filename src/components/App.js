import Login from "./Login";
import Dashboard from "./Dashboard";

const params = new URLSearchParams(window.location.search);
const { access_token, refresh_token } = params;

console.log(access_token);

function App() {
  return (
    <div className="App">
      {access_token ? <Dashboard access_token={access_token} /> : <Login />}
    </div>
  );
}

export default App;
