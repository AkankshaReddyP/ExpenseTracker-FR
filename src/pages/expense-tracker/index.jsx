import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useState, useEffect } from "react";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./styles.css";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
    const { addTransaction } = useAddTransaction();
    const { transactions, transactionTotals } = useGetTransactions();
    const navigate = useNavigate();
    const { name, profilePhoto } = useGetUserInfo();
    const [description, setDescription] = useState("");
    const [transactionAmount, setTransactionAmount] = useState(0);
    const [transactionType, setTransactionType] = useState("expense");
    const { balance, income, expenses } = transactionTotals;

    const onSubmit = (e) => {
        e.preventDefault();
        addTransaction({ description, transactionAmount, transactionType });
        setDescription("");
        setTransactionAmount(0);
    };

    const signUserOut = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            navigate("/");
        } catch (e) {
            console.error(e);
        }
    };

    // Ensure state is populated from localStorage on component mount
    useEffect(() => {
        const authInfo = JSON.parse(localStorage.getItem("auth"));
        if (authInfo) {
            // Assuming you have a way to set user info from local storage
            // setUser(authInfo);
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            <div className="expense-tracker">
                <div className="top-bar">
                    <div className="profile">
                        {profilePhoto && (
                            <img className="profile-photo" src={profilePhoto} alt="Profile" />
                        )}
                        <button className="sign-out" onClick={signUserOut}>Log out</button>
                    </div>
                </div>
                <div className="container">
                    <h1>{name}'s Expense Tracker</h1>
                    <div className="Balance">
                        <h3>Balance</h3>
                        <h2>${balance}</h2>
                    </div>
                    <div className="summary">
                        <div className="income">
                            <h4>Income</h4>
                            <p>${income}</p>
                        </div>
                        <div className="Expense">
                            <h4>Expense</h4>
                            <p>${expenses}</p>
                        </div>
                    </div>
                    <form className="add-transaction" onSubmit={onSubmit}>
                        <input
                            type="text"
                            placeholder="Description"
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                        <input
                            type="number"
                            placeholder="Amount"
                            required
                            onChange={(e) => setTransactionAmount(Number(e.target.value))}
                            value={transactionAmount}
                        />
                        <label htmlFor="expense">Expense</label>
                        <input
                            type="radio"
                            id="expense"
                            value="expense"
                            checked={transactionType === "expense"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <label htmlFor="income">Income</label>
                        <input
                            type="radio"
                            id="income"
                            value="income"
                            checked={transactionType === "income"}
                            onChange={(e) => setTransactionType(e.target.value)}
                        />
                        <button type="submit">Add Transaction</button>
                    </form>
                </div>
            
            <div className="Transactions">
                <h3>Transactions</h3>
                <ul>
                    {transactions.map((transaction, index) => {
                        const { description, transactionAmount, transactionType } = transaction;
                        return (
                            <li key={index}>
                                <h4>{description}</h4>
                                <p>${transactionAmount} <label style={{ color: transactionType === "expense" ? "red" : "green" }}>{transactionType}</label></p>
                            </li>
                        );
                    })}
                </ul>
            </div>
            </div>
        </>
    );
};
