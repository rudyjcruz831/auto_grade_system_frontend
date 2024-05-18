import React, { useState } from 'react';
import axios from 'axios';
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
      const response = await axios.post('http://localhost:50052/upload', formData, {
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
