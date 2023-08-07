import React, { useState } from 'react';
import './styles.css';
import {FIREBASE_DB} from "./firebaseConfig";
import { addDoc, collection, deleteDoc, updateDoc, onSnapshot, doc  } from 'firebase/firestore';

const InputForm = () => {

  const generateRandomString = (length = 7) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }


  const [formData, setFormData] = useState({
    title: "",
    text: "",
    words: "",
  });

  const handleChange = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    setFormData({
      ...formData, 
      [inputName]: inputValue
    })
  }

  const submitForm = async (e) => {
    e.preventDefault();
    await addStories();
  }

  //SAVING STORIES
  const addStories = async () => {
    const randomString = generateRandomString();
    await addDoc(collection(FIREBASE_DB, "allstories"), {
      title: formData.title,
      text: formData.text,
      id: randomString,
      words: formData.words
    });
    
  }


  return (
    <form className="form" onSubmit={submitForm}>
      <div className="input-wrapper">
        <label className="label" htmlFor="title">Title</label>
        <input 
        className="input-text" 
        type="text" 
        id="title" 
        name="title" 
        placeholder="Enter the title"
        value={formData.title}
        onChange={handleChange}/>
      </div>
      <div className="input-wrapper">
        <label className="label" htmlFor="text">Text</label>
        <textarea
          className="input-textarea"
          id="text"
          name="text"
          rows="5"
          placeholder="Enter your text here..."
          value={formData.text}
          onChange={handleChange}/>
      </div>
      <div className="input-wrapper">
        <label className="label" htmlFor="words">Words</label>
        <textarea
          className="input-textarea"
          id="words"
          name="words"
          rows="5"
          placeholder="Enter words..."
          value={formData.words}
          onChange={handleChange}/>
      </div>
      <button type="submit" className="submit-btn">Submit</button>
    </form>

  );
};

export default InputForm;
