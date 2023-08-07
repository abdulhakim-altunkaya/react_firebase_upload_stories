import React, { useState } from 'react';
import './styles.css';

const InputForm = () => {



  const [formData, setFormData] = useState({
    title: "",
    text: "",
    id: "",
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

  const submitForm = (e) => {
    e.preventDefault();
    console.log(formData);
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
        <label className="label" htmlFor="id">ID</label>
        <input className="input-text" 
        type="text" 
        id="id" 
        name="id" 
        placeholder="Enter the ID" 
        value={formData.id}
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
