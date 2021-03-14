import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { db } from './firebase';

const App = () => {

  // default, saving, success, error
  const [status, setStatus] = useState('default')
  const [url, setUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    setStatus('saving');
    db.collection("img").doc("singleDisplay").set({
      imgUrl: url
    })
    .then(() => {
        console.log("Document successfully written!");
        setStatus('success');
        setTimeout(() => {
          setUrl('');
          setStatus('default');
        }, 2000)
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
        setStatus(error);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Enter a URL to an image and it will display on Will's Unicorn HAT HD!
        </p>
        { status === 'error' && 
          <p>There was an error, yo. { errorMsg }</p>
        }
        <form onSubmit={onSubmit}>
          <input type="text" name="imgUrl" value={url} onChange={e => setUrl(e.target.value)} disabled={status === 'saving'} />
          <button type="submit" disabled={status === 'saving'}>Submit</button>
        </form>
      </header>
    </div>
  );
};

export default App;
