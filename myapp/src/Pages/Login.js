import { useRef, useState } from "react";
import { useNavigate,Link } from "react-router-dom";


function Login() {
  const userCred = useRef({});
  let navigate = useNavigate();
  let [toastModal, setToastModal] = useState({ status: false, message: null });

  let setValue = (propName, propValue) => {
    userCred.current[propName] = propValue;
  };

  function submitData() {
    let propertyName = Object.keys(userCred.current);

    if (propertyName.length !== 0) {
      //   console.log(userCred.current);
      fetch("http://localhost:8000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCred.current),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.status === true) {
            // console.log(res);
            localStorage.setItem("token", JSON.stringify(res));
            navigate("/home");
          } else {
            setToastModal({ status: true, message: res.message });

            setTimeout(() => {
              setToastModal({ status: false, message: null });
            }, 3000);
            // console.log(res.message)
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Please Fill The Form");
    }
  }

  return (
    <>
      <div className="container-fluid form-container">
        <div className="card form-card">
          <h2 className="mb-3">Login</h2>
          <div className="form-data">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => {
                setValue("email", e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => {
                setValue("password", e.target.value);
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "14px 0",
              }}
            >
              <button className="btn btn-primary" onClick={submitData}>
                Login Now
              </button>
              <button className="btn">
                <Link to="/" style={{ color: "gray" }}>
                  Register Now
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      {toastModal.status ? (
        <div className="alert toast-msg alert-danger">{toastModal.message}</div>
      ) : null}
    </>
  );
}

export default Login;
