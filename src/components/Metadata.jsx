import React, { Fragment } from 'react';
import styled from 'styled-components';

const Mention = styled.span`
    ${
        props => props.positive && `
        color: #39c65a;
        `
    }
    ${
        props => props.negative && `
        color: #e61919;
        `
    }
`

const Metadata = ({label, sentiment, volume}) => {
    const { positive = 0, neutral = 0, negative = 0 } = sentiment
    return (
        <Fragment>
            <p data-testid="metadata-header">Information on topic "{label}"</p>
            <p>Total mentions: {volume}</p>
            <p>Positive mentions: <Mention data-testid='positive-mention' positive>{positive || 0}</Mention></p>
            <p>Neutral mentions: <Mention data-testid='neutral-mention'>{neutral || 0}</Mention></p>
            <p>Negative mentions: <Mention data-testid='negative-mention' negative>{negative || 0}</Mention></p>
        </Fragment>
    )
}

export default Metadata