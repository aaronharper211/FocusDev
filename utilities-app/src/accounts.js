import './accounts.css';
import { useEffect } from "react";
import { useState } from "react";
import 'reactjs-popup/dist/index.css';

import { HiTrendingUp } from "react-icons/hi";

function Accounts({ setLoggedIn }) {

    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [logInEmail, setLogInEmail] = useState('');
    const [logInPassword, setLogInPassword] = useState('');

    const handleSignUp = async (e) => {

        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/signup`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',

            body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
        });

        const data = await response.json();
        console.log(data);
    };

    const handleLogIn = async (e) => {

        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',

            body: JSON.stringify({ email: logInEmail, password: logInPassword }),
        });

        const data = await response.json();

        if (data.message === "Login successful!") {
            setLoggedIn(true);
        }
    };

    async function checkLoginStatus() {

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/status`, 
            { credentials: 'include' });
        const data = await response.json();

        try {
            if (data.loggedIn) {
                setLoggedIn(true);

            } else {

                setLoggedIn(false);
                console.log("User is not logged in");
            }
        } catch (error) {
            console.error("Error checking login Status", error);
        }

    }

    useEffect(() => {
        // Run checkLoginStatus on component mount to check the initial login status
        checkLoginStatus();
    }, []);

    return (

        <div className="AccountsContainer">
            {/* Only show the forms if the user is not logged in */}
            <div className="AccountsPortal">
                <span id="accountsTitle">

                    <HiTrendingUp style={{
                        display: 'flex',
                        color: '#1DB954',
                        fontSize: '50px',
                        margin: '10px'

                    }} /> FocusDev </span>
                <span id="accountsSubTitle"> Please enter your details to sign in. </span>
                <span id="accountsheading">Log In</span>
                <form id="login" onSubmit={handleLogIn}>
                    <div className="Log-in">
                        <span id="inputHeading">Email</span>
                        <input
                            type="email"
                            id="LogInEmail"
                            required
                            value={logInEmail}
                            onChange={(e) => setLogInEmail(e.target.value)}
                        />
                        <span id="inputHeading">Password</span>
                        <input
                            type="password"
                            id="LogInPassword"
                            required
                            value={logInPassword}
                            onChange={(e) => setLogInPassword(e.target.value)}
                        />
                        <button className="LogInSubmit">
                            Login
                        </button>
                    </div>
                </form>

                <span id="accountsheading"> Sign Up </span>
                <form id="signup" onSubmit={handleSignUp}>
                    <div className="Sign-up">
                        <span id="inputHeading">Email</span>
                        <input
                            type="email"
                            id="SignUpEmail"
                            required
                            value={signUpEmail}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                        />
                        <span id="inputHeading">Password</span>
                        <input
                            type="password"
                            id="SignUpPassword"
                            required
                            value={signUpPassword}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                        />
                        <button className="SignInSubmit">
                            Sign up
                        </button>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default Accounts;