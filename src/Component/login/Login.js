import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Netflix from "./Netflix.svg";
import banner from "./banner.jpg";
import { auth } from "../Firebase";
import { signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth";

const Login = ({ page }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userExist, setuserXist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [PasswordErr, setPasswordErr] = useState(false);
  const[registerdEmail,setRegisterdEmail] = useState(false);
  const[registerdPassword,setRegisterdPassword] = useState(false);
  
// Reset the email error when the input field gains focus
  const handleEmailInputFocus = () => {
    setEmailErr(false); 
    setPasswordErr(false)
    setuserXist(false)
    setRegisterdEmail(false)
    setRegisterdPassword(false)
  };
  const handleClick = (e) => {
    if (page) {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        if (userCredential) {
          navigate("/main/Banner");
        }
        // const user = userCredential.user;
        // console.log(user);
        e.preventDefault();
      })
      .catch((error) => {
        if (email.length===0 && password.length===0) {
          setEmailErr(true)
          setPasswordErr(true)
        }
        setuserXist(true);
      });
    }
    
    else{
     createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
      if (userCredential) {
        navigate("/main/Banner");
      }
    })
    .catch((error) => {
      if(email.length===0||password.length===0){
       setRegisterdEmail(true)
       setRegisterdPassword(true)
      }
     if (userExist) {
      
     }
      setEmailExist(true)
    });
    }
  };
  useEffect(() => {
    setuserXist(false);
    setEmailExist(false)
  }, [page])
   useEffect(()=>{
    if (!email&&!password) {
      setEmailExist(false)
    }
   
   })
  

  return (
    <div>
      <Link to="/">
        <img src={Netflix} width={150} className="logo2" alt="" />
      </Link>
      <img className="Ban-image"
        src={banner}
        
        alt=""
      />
      <div className="layover"></div>
      <div className="contain">
        <h2 className="heading">{page ? "Sign In" : "Register"}</h2>
        <div className="container2">
          {/* this below code run when user do not exist or registered */}
          { userExist &&  !emailErr&& !PasswordErr &&(
            <p className="warn">
              Sorry, we can't find an account with this email address. Please
              try again or{" "}
              <Link to="/register" className="link">
                create a new account.
              </Link>
            </p>
          )}
          {/* this code below run when user email  is already registered */}
           {emailExist && (
            <p className="warn">
             E-mail Already Exist 
             
              <Link to="/login" className="link">
                Login Now
              </Link>
            </p>
          )}
          <input
            className="lemail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={handleEmailInputFocus} 
            type="email  or phone number"
            name=""
            id=""
            placeholder="Email  or phone number"
          />
         {emailErr && page? <p className="warn2"> Email is Invalid/blank</p>:''}
         {!page&& registerdEmail?<p className="warn2">Email is empty</p>:''}
        
          <br></br>
          <input
            className="lpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={handleEmailInputFocus} 
            type="text"
            placeholder="Password"
          />
         {PasswordErr  && page ? <p className="warn2"> Password is Invalid/blank</p>:''}
         {!page&& registerdPassword?<p className="warn2">Password is empty</p>:''}
         {/* extra paasword input */}
         {/* { page?'':<input
            className="lpassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            placeholder" Confirm Password"
          />} */}
          <button className=" mybutton btn btn-danger" onClick={handleClick}>
            {page ? "Sign In" : "Register Now"}
          </button>
          <br></br>
          
          {page?<div><input className="check" type="checkbox" name="" id="" />
          <span>Remember me</span></div>:''}
          
          <div className="NewSignIn">
            <p>
              {page ? "New to Netflix?" : "Existing User"}
              <Link to={page ? "/register" : "/login"} className="link">
                {page ? "Register Now." : "Sign In"}
              </Link>
            </p>
            <p className="inst">
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
