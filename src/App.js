import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !email) {
      alert('Please select a file and enter an email first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('email', email);

    try {
      const response = await axios.post('http://<your-aws-backend-url>/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully!');
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      setMessage('Error uploading file.');
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <input type="email" placeholder="Enter your email" onChange={handleEmailChange} />
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleFileUpload}>Upload File</button>
        </div>
        {message && <p>{message}</p>}
      </header>
    </div>
  );
}

export default App;
