import React from 'react';
import styled from 'styled-components';
import TextSection from './TextSection';

const H4 = styled.h4`
  color: ${({ color }) => color};
  font-size: 25px;
  margin: 0;
`;

function LowerSection() {
  return (
    <>
      <TextSection
        title="Our Story"
        id="our-story"
        imgUrl="/assets/tommie.png"
        imgName="tommie"
        paragraph={(
          <>
            <p>Long ago in a galaxy far, far away...</p>
            <p>was a world inhabited by Eggies.</p>
            <p>They dreamed of being accepted by the other planets in their galaxy, but they were accepted neither as a fruit nor a vegetable, no matter how hard they tried to assimilate.</p>
            <p>In a society that judges and places stereotypes very readily upon others, Eggies embodies that inner desire to feel like they are welcome and that they belong</p>
          </>
          )}
      />
      <TextSection
        title="Roadmap"
        id="roadmap"
        imgUrl="/assets/moon-worm.png"
        imgName="moon worm"
        paragraph={(
          <>
            <H4 color="#E56942">25% sold</H4>
            <p>NFT Giveaway</p>
            <H4 color="#42AF60">50% sold</H4>
            <p>Rare NFT Giveaway</p>
            <H4 color="#5EAFDC">75% sold</H4>
            <p>coming soon...</p>
            <H4 color="#B171C7">100% sold</H4>
            <p>coming soon...</p>
          </>
          )}
      />
    </>
  );
}

export default LowerSection;
