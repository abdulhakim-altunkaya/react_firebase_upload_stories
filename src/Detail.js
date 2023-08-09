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
    const [wordsText, setWordsText] = useState("");

    //2. grab the target story data and put it inside the input fields
    useEffect(() => {
        const fetchDoc = async () => {
            const storyRef = doc(FIREBASE_DB, "allstories", firestoreId);
            const docSnap = await getDoc(storyRef);
            const docData = docSnap.data();
            setTargetDoc(docData);
            setTitleText(docData.title);
            setMainText(docData.text);
            setWordsText(docData.words);
        };
        fetchDoc();
    }, [firestoreId]);

    //3. change the values of target story
    const handleChange = async () => {
        const storyRef = doc(FIREBASE_DB, "allstories", firestoreId);
        const data = {
            title: titleText,
            text: mainText,
            words: wordsText
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
                <label className="label" htmlFor="words">Words</label>
                <textarea
                    className="input-textarea"
                    id="words"
                    name="words"
                    rows="5"
                    placeholder="Enter words..."
                    value={wordsText}
                    onChange={(e) => setWordsText(e.target.value)}/>
            </div>
            <div className='buttonContainer2'>
                <button type='submit' className='button11'>SAVE CHANGES</button>
                <button className='button11' onClick={() => navigate("/")}>HOMEPAGE</button>
            </div>
        </form>
        
    )
}

export default Detail;