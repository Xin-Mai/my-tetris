import { createRef, forwardRef, useEffect, useRef, useState } from 'react';
import './App.scss';
import Keyboard from '../components/Keyboard';
import Screen from '../components/Screen';

function App() {
  // the size of the page
  const [w, setW] = useState<number>(document.documentElement.clientWidth);
  const [h, setH] = useState<number>(document.documentElement.clientHeight);

  const screen = createRef<Screen>();
  
  const resize =  () => {
    setH(document.documentElement.clientHeight);
    setW(document.documentElement.clientWidth); 
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      resize();

      return () => window.removeEventListener('resize', resize);
    })
  }, []);

  const [start, setStart] = useState(false);

  const handleKeyboardEvent = (event: string) => {
    console.log('reveive event', event);
    if (!start && event !== 'drop') return;
    switch (event) {
      case 'drop':
        if (!start) {
          setStart(true);
          screen.current?.start();
        } else {
          // drop the block
          screen.current?.drop();
        }
        break;
      case 'restart':
        setStart(false);
        screen.current?.restart();
        break;
      case 'moveDown':
        screen.current?.moveDown();
        break;
      case 'moveLeft':
        screen.current?.moveLeft();
        break;
      case 'moveRight':
        screen.current?.moveRight();
        break;
      case 'pause':
        screen.current?.pause();
        break;
      case 'spin':
        screen.current?.spin();
        break;
    }
  };

  return (
    <div className="App">
      <Screen ref={screen} />
      <Keyboard emitter={handleKeyboardEvent}/>
    </div>
  );
}

export default App;
