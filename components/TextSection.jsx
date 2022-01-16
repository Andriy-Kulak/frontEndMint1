import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Section = styled.div`
  margin-top: 60px;
  text-align: left;
`;

const H2 = styled.h2`
  font-size: 30px;
`;

function TextSection({
  title, paragraph, id, imgUrl, imgName,
}) {
  return (
    <Section id={id}>
      {imgUrl && <Image alt={imgName || ''} src={imgUrl} width={200} height={200} />}
      {title && <H2>{title}</H2>}
      {paragraph}
    </Section>
  );
}

export default TextSection;
