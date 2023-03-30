import { initializeApp } from "firebase/app";
import { React, useState, useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firebaseConfig from "../Config/config.js";
import { useSelector } from 'react-redux';
import Cookies from 'universal-cookie';
import { setUser } from '../redux/action';
import { useDispatch } from 'react-redux';

import { GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signInWithRedirect } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";

export default function LoginPage() {
    const dispatch = useDispatch();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    const user = useSelector((state) => state.user.user);
    console.log(user);

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        provider.addScope("email");
        const { user } = await signInWithPopup(auth, provider);
        const uid = user.uid;

        async function getUserData(uid) {
            const docRef = doc(firestore, "users", uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const cookie = new Cookies();
                cookie.set("user", docSnap.data());
                console.log(cookie.get("user"));
                dispatch(setUser(docSnap.data()));
            } else {
                console.log("No such document!");
                const userData = {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    time: "0:0",
                    email: user.providerData[0].email,
                    dos: [],
                    donts: [],
                    dosCount: [0, 0, 0],
                    dontsCount: [0, 0, 0],
                    streakdata: [],
                };
                const userDocRef = doc(collection(firestore, "users"), user.uid);
                await setDoc(userDocRef, userData); // wait for the data to be written to Firestore
                dispatch(setUser(userData));
            }
        }

        getUserData(uid);
    };


    return (
        <div>
            <button onClick={signInWithGoogle}>Login with Google</button>


        </div>
    );

}

