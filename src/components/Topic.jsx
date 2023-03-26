import React from 'react';
import styled from 'styled-components';

const fontSizes = ['16px', '20px', '32px', '45px', '56px', '65px']
const lineHeights = ['20px', '24px', '36px', '48px', '62px', '70px']

const Button = styled.button`
    color: #4a4a4a;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: ${props => fontSizes[props.level]};
    line-height: ${props => lineHeights[props.level]};
    order: ${props => props.randomOrder};
    &.positive {
        color: #39c65a;
    }
    &.negative {
        color: #e61919;
    }
`

const Topic = ({label, level, onClick, randomOrder, sentimentScore}) => {
    const sentiment = sentimentScore > 60 ? 'positive' : sentimentScore < 40 ? 'negative' : ''

    return (
        <Button onClick={onClick} className={sentiment} level={level} randomOrder={randomOrder}>
            {label}
        </Button>
    )
}

export default Topic