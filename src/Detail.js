import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, query, getDocs, getDoc, deleteDoc, setDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig";

function Detail() {
    const navigate = useNavigate();

    //1. fetch the target story by the id params from List.js
    const { firestoreId } = useParams();
    
    
    const [targetDoc, setTargetDoc] = useState({});
    const [titleText, setTitleText] = useState("");
    const [mainText, setMainText] = useState("");
    const [word1Text, setWord1Text] = useState("");
    const [word2Text, setWord2Text] = useState("");
    const [word3Text, setWord3Text] = useState("");
    //2. grab the target story data and put it inside the input fields
    useEffect(() => {
        const fetchDoc = async () => {
            const storyRef = doc(FIREBASE_DB, "allstories", firestoreId);
            const docSnap = await getDoc(storyRef);
            const docData = docSnap.data();
            setTargetDoc(docData);
            setTitleText(docData.title);
            setMainText(docData.text);
            setWord1Text(docData.word1Text);
            setWord2Text(docData.word2Text);
            setWord3Text(docData.word3Text);
        };
        fetchDoc();
    }, [firestoreId]);

    //3. change the values of target story
    const handleChange = async () => {
        const storyRef = doc(FIREBASE_DB, "allstories", firestoreId);
        const data = {
            title: titleText,
            text: mainText,
            word1: word1Text,
            word2: word2Text,
            word3: word3Text,
          };
        await setDoc(storyRef, data)
        navigate("/");
    }

 
    return (
        <form className="form" onSubmit={handleChange}>
            <h1>UPDATE A STORY</h1>
            <div className="input-wrapper">
                <label className="label" htmlFor="title">Title</label>
                <input 
                    className="input-text" 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Enter the title"
                    value={titleText}
                    onChange={(e) => setTitleText(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <label className="label" htmlFor="text">Text</label>
                <textarea
                    className="input-textarea"
                    id="text"
                    name="text"
                    rows="5"
                    placeholder="Enter your text here..."
                    value={mainText}
                    onChange={(e) => setMainText(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <label className="label" htmlFor="word1Text">Word1</label>
                <textarea
                    className="input-textarea"
                    id="word1Text"
                    name="word1Text"
                    rows="2"
                    placeholder="Enter word 1"
                    value={word1Text}
                    onChange={(e) => setWord1Text(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <label className="label" htmlFor="word2Text">Word2</label>
                <textarea
                    className="input-textarea"
                    id="word2Text"
                    name="word2Text"
                    rows="2"
                    placeholder="Enter word 2"
                    value={word2Text}
                    onChange={(e) => setWord2Text(e.target.value)}/>
            </div>
            <div className="input-wrapper">
                <label className="label" htmlFor="word3Text">Word3</label>
                <textarea
                    className="input-textarea"
                    id="word3Text"
                    name="word3Text"
                    rows="2"
                    placeholder="Enter word 3"
                    value={word3Text}
                    onChange={(e) => setWord3Text(e.target.value)}/>
            </div>
            <div className='buttonContainer2'>
                <button type='submit' className='button11'>SAVE CHANGES</button>
                <button className='button11' onClick={() => navigate("/")}>HOMEPAGE</button>
            </div>
        </form>
        
    )
}

export default Detail;