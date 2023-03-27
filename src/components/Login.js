import { useEffect, useState } from "react";
import "../index.css";

const Login = () => {
  return (
    <div className="login">
      <h1 className="login-header">Sortify</h1>
      <a href="https://10v703cbx8.execute-api.ap-southeast-2.amazonaws.com/test/auth">
        Login with Spotify
      </a>
    </div>
  );
};

export default Login;
