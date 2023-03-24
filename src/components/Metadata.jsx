import React, { Fragment } from 'react';

const Metadata = ({label, sentiment, volume}) => {
    const { positive = 0, neutral = 0, negative = 0 } = sentiment
    return (
        <Fragment>
            <p data-testid="metadata-header">Information on topic "{label}"</p>
            <p>Total mentions: {volume}</p>
            <p>Positive mentions: <span data-testid='positive-mention' className='positive'>{positive || 0}</span></p>
            <p>Neutral mentions: <span data-testid='neutral-mention'>{neutral || 0}</span></p>
            <p>Negative mentions: <span data-testid='negative-mention' className='negative'>{negative || 0}</span></p>
        </Fragment>
    )
}

export default Metadata