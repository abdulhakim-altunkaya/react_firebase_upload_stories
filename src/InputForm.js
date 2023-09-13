import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import {FIREBASE_DB} from "./firebaseConfig";
import { addDoc, collection, deleteDoc, updateDoc, onSnapshot, doc  } from 'firebase/firestore';

const InputForm = () => {

  const navigate = useNavigate();

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
    word1: "",
    word2: "",
    word3: ""
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
      word1: formData.word1,
      word2: formData.word2,
      word3: formData.word3
    });
    
  }


  return (
    <form className="form" onSubmit={submitForm}>
      <h1>ADD A NEW STORY</h1>
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
        <label className="label" htmlFor="word1">Word1</label>
        <input 
          className="input-text" 
          id="word1"
          name="word1"
          rows="2"
          placeholder="Enter word 1"
          value={formData.word1}
          onChange={handleChange}/>
      </div> 
      <div className="input-wrapper">
        <label className="label" htmlFor="word2">Word2</label>
        <input 
          className="input-text" 
          id="word2"
          name="word2"
          rows="2"
          placeholder="Enter word 2"
          value={formData.word2}
          onChange={handleChange}/>
      </div> 
      <div className="input-wrapper">
        <label className="label" htmlFor="word3">Word3</label>
        <input 
          className="input-text" 
          id="word3"
          name="word3"
          rows="2"
          placeholder="Enter word 3"
          value={formData.word3}
          onChange={handleChange}/>
      </div>    
      <div className='buttonContainer2'>
          <button type="submit" className="button11">SAVE STORY</button>
          <button className='button11' onClick={() => navigate("/")}>HOMEPAGE</button>
      </div>
    </form>

  );
};

export default InputForm;
