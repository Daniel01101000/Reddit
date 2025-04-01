import './App.css';
import { useState } from 'react';
import RedditPosts from './components/Cards/RedditPosts.jsx';
import Header from './components/Header/Header.jsx';

function App() {
  const [subreddit, setSubreddit] = useState('EarthPorn'); // Estado para el subreddit

  return (
    <div className="App">
      <Header onSearch={setSubreddit} /> {/* Pasamos la función para actualizar el subreddit */}
      
      <RedditPosts subreddit={subreddit} /> {/* Pasamos el subreddit a RedditPosts */}
    </div>
  );
}

export default App;
