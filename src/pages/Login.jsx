import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OnekepImage from "../assets/images/kn_original.png";
import "../assets/css/login.css";
import { FaLock, FaUser } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usenavigate = useNavigate();

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  const handlelogin = (e) => {
    e.preventDefault();
    if (validate()) {
      let inputobj = {
        username: username,
        password: password,
      };
      fetch("http://kepappsp01:8071/api/Account/Authenticate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(inputobj),
      })
        .then((res) => res.json())

        .then((resp) => {
          // console.log(resp.data);

          if (resp.status === 1) {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("jwttoken", resp.jwtToken);

            // Get and set role
            const obj = JSON.parse(resp.data);
            const role = obj.systemAuth[0].Rolename;
            sessionStorage.setItem("rolename", role);
            sessionStorage.getItem("rolename");
            console.log(role);

            usenavigate("/");
          } else if (resp.status === 2) {
            toast.error("Please Enter Valid Credentials.");
          }
        })
        .catch((err) => {
          toast.error("Login Failed due to :" + err.message);
        });
    }
  };
  const validate = () => {
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }
    return result;
  };
  return (
    <div className="login-body">
      <div className="wrapper">
        <div className="login-image">
          <img src={OnekepImage} alt="onekep" />
        </div>
        <form onSubmit={handlelogin}>
          <h3>Scrap Management System</h3>
          <div>
            <span className="login-header">Sign in with your AD account</span>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
