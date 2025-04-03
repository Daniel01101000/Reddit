import './App.css';
import { useState } from 'react';
import RedditPosts from './components/Cards/RedditPosts.jsx';
import Header from './components/Header/Header.jsx';
import RedditMenu from './components/DropDownMenu/DropMenu.jsx';

function App() {
  const [subreddit, setSubreddit] = useState('EarthPorn'); // Estado para el subreddit

  return (
    <div className="App">
      <Header onSearch={setSubreddit} />
      <RedditMenu setSubreddit={setSubreddit} /> {/* Pasamos la función */}
      <RedditPosts subreddit={subreddit} />
    </div>
  );
}

export default App;