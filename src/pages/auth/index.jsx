import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from 'firebase/auth';
import { useNavigate,Navigate } from "react-router-dom";
import "./styles.css";
import {useGetUserInfo} from "../../hooks/useGetUserInfo"
export const Auth = () => {
    const navigate = useNavigate();
    
    const signInWithGoogle = async () => {
        try {
            const results = await signInWithPopup(auth, provider);
            const authInfo = {
                userID: results.user.uid,
                name: results.user.displayName,
                profilePhoto: results.user.photoURL,
                isAuth: true,
            };
            localStorage.setItem("auth", JSON.stringify(authInfo));
            navigate("/expense-tracker");
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };
    

    return (
        <div>
            <p>Sign in with Google to Continue</p>
            <button onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </div>
    );
};
