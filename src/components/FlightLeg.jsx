import React from 'react';
import { IoMdTime } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { format, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

const getFormatedDateTime = (type, dateString) => {
  const date = parseISO(dateString);
  switch (type) {
    case 'date': 
      return format(date, 'dd MMM ccc', { locale: ru }).slice(0, -1);
    case 'time': 
      return format(date, 'HH:mm', { locale: ru });
    default: return dateString;
  }
};

const getStopWord = (stops) => {
  const words = ['пересадка', 'пересадки', 'пересадок'];
  if (stops === 1) {
    return `${stops}  ${words[0]}`
  } else if (stops >= 2 && stops <= 4) {
    return `${stops}  ${words[1]}`
  } else {
    return `${stops}  ${words[2]}`;
  }
};

const FlightLeg = ({ leg }) => {
  const departure = leg.segments[0];
  const arrival = leg.segments[leg.segments.length - 1];
  return (
    <>
      {departure.departureCity && arrival.arrivalCity &&
        <>
          <div className='row'>
              <div className='col text-start'>
                {departure.departureCity.caption}, {departure.departureAirport.caption}
                <span className='text-primary'> ({departure.departureAirport.uid})</span>
              </div>
              <div className="col-1 text-center">
                <IoIosArrowRoundForward size={20}/>
              </div>
              <div className='col text-end'>
                {arrival.arrivalCity.caption}, {arrival.arrivalAirport.caption}
                <span className='text-primary'> ({arrival.arrivalAirport.uid})</span>
              </div>
          </div>
          <div className="row align-items-center">
            <div className='col text-start'>
            {departure.departureDate &&
                <>
                  <span className='fs-5'>{getFormatedDateTime('time',departure.departureDate)}</span>
                  <span className='text-primary'> {getFormatedDateTime('date',departure.departureDate)}</span>
                </>
              }
            </div>
            <div className="col-3 text-center">
              <div className="d-flex align-items-center justify-content-center">
                <IoMdTime size={20}/>
                <span>{Math.floor(leg.duration / 60)} ч {leg.duration % 60} мин</span>
              </div>
            </div>
            <div className="col text-end">
              {arrival.arrivalDate &&
                <>
                  <span className='text-primary'>{getFormatedDateTime('date',arrival.arrivalDate)}</span>
                  <span className='fs-5'> {getFormatedDateTime('time',arrival.arrivalDate)}</span>
                </>
              }
            </div>
          </div>
          {leg.segments.length > 1 &&
            <div className="row">
              <div className="col">
                <p className='text-warning text-center mb-0'>{getStopWord(leg.segments.length - 1)}</p>
              </div>
            </div>
          }
          <div className="row">
            <div className="col">
              <p className='mb-2 text-start'>Рейс выполняет: {departure.airline.caption}</p>
            </div>
          </div>
        </>
      }
    </>
  );
}

export default FlightLeg;
