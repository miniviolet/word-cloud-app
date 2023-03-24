import React from 'react';

const Topic = ({label, level, onClick, randomOrder, sentimentScore}) => {
    const sentiment = sentimentScore > 60 ? 'positive' : sentimentScore < 40 ? 'negative' : ''
    return (
        <button onClick={onClick} className={`topic ${sentiment}`} data-level={level} style={{order: randomOrder}}>
            {label}
        </button>
    )
}

export default Topic