import './App.css';
import { useEffect, useState } from 'react';
import Topics from './assets/topics'
import Topic from './components/Topic';
import Metadata from './components/Metadata';

function App() {
  const topics = Topics.topics
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentWord, setCurrentWord] = useState(topics[0])
  const [randomOrderList, setRandomOrderList] = useState(Array.from({length: topics.length}, () => Math.floor(Math.random() * topics.length)))

  useEffect(() => {
    setCurrentWord(topics[currentIndex])
  }, [currentIndex, topics])

  useEffect(() => {
    setRandomOrderList(Array.from({length: topics.length}, () => Math.floor(Math.random() * topics.length)))
  }, [topics])

  const scores = topics.map(({ volume }) => volume)
  scores.sort(function(a, b) {
    return a - b;
  });
  const range = (scores[scores.length - 1] - scores[0]) / 6

  const whichRange = (x) => {
    let rangeScore = 0
    for (let index = 0; index < 6; index++) {
      let bottomRange = scores[0] + (range * index)
      let topRange = bottomRange + range
      if(bottomRange < x && x <= topRange) rangeScore = index + 1
    }
    return rangeScore
  }

  return (
    <div className="App">
      <header className='header'>
        <h1>My Topics Challenge</h1>
      </header>
      <section className='word-cloud'>
        {
          topics.map((topic, idx) => {
            const { id, label, sentimentScore, volume } = topic
            const level = whichRange(volume)
           return <Topic key={id} {...{label, onClick: () => setCurrentIndex(idx), level, randomOrder: randomOrderList[idx], sentimentScore}} />
          })
        }
      </section>
      <section className='sidebar'>
        <Metadata {...{label: currentWord.label, sentiment: currentWord.sentiment, volume: currentWord.volume}} />
      </section>
    </div>
  );
}

export default App;
