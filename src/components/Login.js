import "../index.css";

const Login = () => {
  return (
    <div className="login w-full p-4">
      <main class="w-full flex flex-col h-screen content-center justify-center">
        <div class="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl m-auto">
          <h1 className="login-header">Sortify</h1>
          <a href="https://10v703cbx8.execute-api.ap-southeast-2.amazonaws.com/test/auth">
            Login with Spotify
          </a>
        </div>
      </main>
    </div>
  );
};

export default Login;
