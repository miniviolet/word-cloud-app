import {fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import Topics from './assets/topics'

describe('Word cloud app', () => {
  const topics = Topics.topics

  test('renders Cloud word',() => {
    const container = render(<App />);
    expect(container).toMatchSnapshot()
    expect(screen.getAllByRole('button').length).toEqual(topics.length)
  })

  test('renders Metadata', () => {
    render(<App />);
    expect(screen.getByTestId('metadata-header')).toBeInTheDocument()
    expect(screen.getByTestId('metadata-header')).toHaveTextContent(topics[0].label)
    expect(screen.getByTestId('positive-mention')).toHaveTextContent(topics[0].sentiment.positive)
    expect(screen.getByTestId('neutral-mention')).toHaveTextContent(topics[0].sentiment.neutral)
    expect(screen.getByTestId('negative-mention')).toHaveTextContent(topics[0].sentiment.negative)
  })

  test('updates Metadata on click', () => {
    render(<App />);
    const buttonClicked = screen.getAllByRole('button')[1]
    fireEvent.click(buttonClicked)
    expect(screen.getByTestId('metadata-header')).toHaveTextContent(topics[1].label)
    expect(screen.getByTestId('positive-mention')).toHaveTextContent(topics[1].sentiment.positive)
    expect(screen.getByTestId('neutral-mention')).toHaveTextContent(topics[1].sentiment.neutral)
    expect(screen.getByTestId('negative-mention')).toHaveTextContent(0)
  })
});
