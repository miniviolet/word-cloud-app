import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Topics from './assets/topics'
import Topic from './components/Topic';
import Metadata from './components/Metadata';

const Main = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 3fr;
  grid-gap: 25px;
  grid-template-areas: "header header"
  "cloud sidebar";
  font-family: Roboto, Helvetica, sans-serif;
`

const Header = styled.header`
  background-color: #282c34;
  color: white;
  grid-area: header;
`

const WordCloud = styled.section`
  grid-area: cloud;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`

const Sidebar = styled.section`
  grid-area: sidebar;
  text-align: left;
`

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
    <Main>
      <Header>
        <h1>My Topics Challenge</h1>
      </Header>
      <WordCloud>
        {
          topics.map((topic, idx) => {
            const { id, label, sentimentScore, volume } = topic
            const level = whichRange(volume)
           return <Topic key={id} {...{label, onClick: () => setCurrentIndex(idx), level, randomOrder: randomOrderList[idx], sentimentScore}} />
          })
        }
      </WordCloud>
      <Sidebar>
        <Metadata {...{label: currentWord.label, sentiment: currentWord.sentiment, volume: currentWord.volume}} />
      </Sidebar>
    </Main>
  );
}

export default App;
