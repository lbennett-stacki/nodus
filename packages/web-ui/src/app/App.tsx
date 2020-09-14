import React, { useState, useEffect } from 'react';
import './App.css';
import { AppStyles } from '../styles/AppStyles.styles.tw'
import { IsometricEditor } from '../features/editor/IsometricEditor';

const Loader: React.FC<{ fadeOut: boolean }> = ({ fadeOut }) => {
  const fadeClass = ''
  return (
    <div className={`absolute w-full h-full bg-gray-900 flex justify-center items-center z-10 ${fadeClass}`}>
      <span className="h-3 w-3">
        <span className="animate-ping relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
      </span>
    </div>
  )
}

function App() {

  const [loaded, setLoaded] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => { setLoaded(true) }, 500)
  }, [])
  return (
    <AppStyles>
      { !loaded && <Loader fadeOut={loaded}/> }
      <IsometricEditor />

    </AppStyles>
  );
}

export default App;

