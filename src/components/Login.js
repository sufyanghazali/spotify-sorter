import "../index.css";

const Login = () => {
  return (
    <div className="login w-full p-4">
      <main class="flex flex-col h-screen content-center justify-center text-white">
        <div>
          <h1 className="login-header">Sortify</h1>

          <div>
            <a href="https://10v703cbx8.execute-api.ap-southeast-2.amazonaws.com/test/auth">
              Login with Spotify
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
