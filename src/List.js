import React, { useState, useEffect } from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig";

import { doc, getDoc } from "firebase/firestore";

function List() {
  const [stories, setStories] = useState([]);

  const getSomething = async () => {
    {/*
        const docRef = doc(FIREBASE_DB, "allstories", "fFn9W2EGNal5a4KZo4wI");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
   */}
  }           
  const getAllStories = async () => {
    const q = query(collection(FIREBASE_DB, "allstories"));
    const querySnapshot = await getDocs(q);
    const storiesArray = [];
    querySnapshot.forEach((doc) => {
      storiesArray.push(doc.data());
    });
    setStories(storiesArray);
  }

  return (
    <div>
      <h1>List of Stories</h1>
      <ul>
        {stories.map((story, index) => (
          <li key={index}>
            <h2>{story.title}</h2>
            <p>{story.text}</p>
            <p>Words: {story.words}</p>
          </li>
        ))}
      </ul>
      <button onClick={getAllStories}>DISPLAY STORIES</button>
    </div>
  );
}

export default List;
