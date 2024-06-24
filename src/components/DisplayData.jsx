import React from 'react';
import Flight from './Flight';

const DisplayData = ({ data }) => {
  return (
    <>
      {data.map((flightInfo, index) => (
        <Flight key={index} flight={flightInfo.flight} />
      ))}
    </>
  )
};

export default DisplayData;
