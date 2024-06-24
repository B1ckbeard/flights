import React from 'react';
import FlightLeg from './FlightLeg';

const Flight = ({flight}) => {
  return (
    <div className="card mb-3">
      <div className="bg-primary px-3 text-white text-end mb-2">
        <span className='fs-4'>{flight.price.total.amount} {flight.price.total.currency}</span>
        <p className='m-0'>Стоимость для одного взрослого пассажира</p>
      </div>
      <div className="fligth-info px-3">
        <div className="border-bottom mb-2">
          <FlightLeg leg={flight.legs[0]} />
        </div>
        <FlightLeg leg={flight.legs[1]} />
      </div>
      <button type="button" className="btn btn-secondary w-100 rounded-0">Выбрать</button>
    </div >
  );
};

export default Flight;
