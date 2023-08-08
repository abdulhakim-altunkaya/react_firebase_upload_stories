import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig";

function Detail() {
    const { firestoreId } = useParams();
    

    const storyRef = doc(FIREBASE_DB, "allstories", firestoreId);
    console.log(storyRef);


    

    return (
        <h1>Detail for Blog ID: {firestoreId}</h1>
    )
}

export default Detail