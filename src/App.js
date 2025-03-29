import './App.css';
import RedditPosts from '../src/components/RedditPosts.jsx';
import Header from './components/Header/Header.jsx';

function App() {
  return (
    <div className="App">
      <Header/>
      <RedditPosts/>
    </div>
  );
}

export default App;
