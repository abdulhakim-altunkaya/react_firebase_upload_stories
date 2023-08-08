import React, { useState } from 'react';
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FIREBASE_DB } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";


function List() {
  const navigate = useNavigate();
 
  const [stories, setStories] = useState([]);

  const getSomething = async () => {
    return;
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
      storiesArray.push({ firestoreId: doc.id, ...doc.data()});
    });
    setStories(storiesArray);
  }

  const deleteStory = async (firestoreId) => {
    const storyRef = doc(FIREBASE_DB, "allstories", firestoreId);
    await deleteDoc(storyRef);
    getAllStories();
  }

  return (
    <div className='titleContainer'>
      <h1>List of Stories</h1>
      {stories.map((story, index) => (
        <div key={index} className='listContainer'>
          <h2 onClick={ () => navigate(`/detail/${story.firestoreId}`) } className='titleHeaders'>{story.title}</h2>
          <img src="/trash3.svg" alt="Trash icon" className='trashIcon' onClick={() => deleteStory(story.firestoreId)} />
        </div>
      ))}
      <div className='buttonContainer'>
        <button className='button11' onClick={getAllStories}>DISPLAY STORIES</button>
        <button className='button11' onClick={() => navigate("/add")}>ADD STORIES</button>
      </div>
    </div>
  );
}

export default List;
