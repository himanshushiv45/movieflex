import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const user = useRef({});
  let navigate = useNavigate();
  let [toastModal, setToastModal] = useState({ status: false, message: null });

  let setValue = (propName, propValue) => {
    user.current[propName] = propValue;
  };

  function submitData() {
    let propertyName = Object.keys(user.current);

    if (propertyName.length !== 0) {
      console.log(user.current);
      fetch("http://localhost:8000/user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user.current),
      })
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.status === true) {
            // console.log(res.message);
            navigate("/login");
          } else {
            setToastModal({ status: true, message: res.message });

            setTimeout(() => {
              setToastModal({ status: false, message: null });
            }, 3000);
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
          <h2 className="mb-3">Registration Form</h2>
          <div className="form-data">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              onChange={(e) => {
                setValue("name", e.target.value);
              }}
            />
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
            <input
              type="text"
              className="form-control"
              placeholder="Enter Contact"
              onChange={(e) => {
                setValue("contact", e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="Enter City"
              onChange={(e) => {
                setValue("city", e.target.value);
              }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", padding:"14px 0" }}>
              <button className="btn btn-primary" onClick={submitData}>
                Register Now
              </button>
              <button className="btn">
             <Link to="/login" style={{color:"gray"}}> Log In</Link>  
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//  function Register() {
// //     const user = useRef({});
// //     // console.log(user.current)

// //     let setValue = (propName, propValue) => {
// //         user.current[propName] = propValue;
// //     }

// //     function submitData() {
// //         console.log(user.current)
// //     }

// // return (
// //         <div className="container-fluid form-container">
// //             <div className="form">
// //                 <h2>Register Form</h2>
// //                 <input type="text" placeholder="Enter Name" onChange={(event) => {
// //                     setValue("name", event.target.value)
// //                 }} />
// //                 <input type="email" placeholder="Enter Email" onChange={(event) => {
// //                     setValue("email", event.target.value)
// //                 }} />
// //                 <input type="password" placeholder="Enter Password" onChange={(event) => {
// //                     setValue("password", event.target.value)
// //                 }} />
// //                 <input type="text" placeholder="Enter Contact" onChange={(event) => {
// //                     setValue("contact", event.target.value)
// //                 }} />
// //                 <input type="text" placeholder="Enter City" onChange={(event) => {
// //                     setValue("city", event.target.value)
// //                 }} />

// //                 <button className="btn" onClick={submitData}>Register Now</button>
// //             </div>
// //         </div>
//   )}

export default Register;
