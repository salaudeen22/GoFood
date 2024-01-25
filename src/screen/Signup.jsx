import React, { useState } from "react";
import { Link } from "react-router-dom";
import { universalurl } from "../helper";


export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${universalurl}/api/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.address,
      }),
    });

    const json = await response.json();
    // console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: `url("https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg") no-repeat center center fixed`,
          backgroundSize: "cover",
        }}
      >
        <form onSubmit={handleSubmit} className="p-5 rounded bg-white">
          <div className="mb-3">
            <label htmlFor="name" className="form-label text-dark">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label text-dark">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text text-dark">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label text-dark"
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label text-dark">
              Address:
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={credentials.address}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
