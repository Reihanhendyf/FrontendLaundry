import React from "react";
import axios from "axios";
import { baseUrl } from "../config";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    };
  }
  loginProcess(event) {
    event.preventDefault();
    let endpoint = "http://localhost:8000/login";
    let request = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post(endpoint, request)
      .then((result) => {
        if (result.data.logged) {
          //store token in local storage
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("user", JSON.stringify(result.data.user));
          window.alert("Congratulation! You're logged");
          window.location.href = "/member";
        } else window.alert("sorry, your username and password is invalid");
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <div className="container">
        <div className="col-lg-4 ml-auto" style={{ margin: "auto" }}>
          <div className="card">
            <div className="card-header bg-primary">
              <h4 className="text-center text-white">LOGIN</h4>
            </div>
            <div className="card-body">
              <form onSubmit={(ev) => this.loginProcess(ev)}>
                Username
                <input
                  type="text"
                  className="form-control"
                  required
                  value={this.state.username}
                  onChange={(ev) =>
                    this.setState({ username: ev.target.value })
                  }
                />
                Password
                <input
                  type="password"
                  className="form-control"
                  required
                  value={this.state.password}
                  onChange={(ev) =>
                    this.setState({ password: ev.target.value })
                  }
                />
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
