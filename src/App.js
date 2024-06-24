import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import flights from './flights.json';
import PaginationData from './components/PaginationData';

const App = () => {
  const initData = flights.result.flights;
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState('');
  const [maxStops, setMaxStops] = useState(null);
  const [chekedCompany, setChekedCompany] = useState([]);
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  useEffect(() => {
    setData(initData);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (priceFrom !== '' && priceTo !== '') {
      filterByPrice(parseInt(priceFrom), parseInt(priceTo));
    } else {
      const sortedData = getSortedData(sortType, initData);
      setData(sortedData);
    }
  }, [priceFrom, priceTo]);// eslint-disable-line react-hooks/exhaustive-deps

  const uniqueNames = Array.from(new Set([...data].map(fl => fl.flight.carrier.caption)));

  const getSortedData = (type, data) => {
    const newData = [...data];
    switch (type) {
      case 'incByPrice':
        return newData.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount);
      case 'decByPrice':
        return newData.sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount);
      case 'byTime':
        return newData.sort((a, b) => a.flight.legs[0].duration - b.flight.legs[0].duration);
      default: return newData;
    }
  };

  const handleSort = (event) => {
    const type = event.target.value;
    const newData = getSortedData(type, data);
    setSortType(type);
    setData(newData);
  };

  const filterByStops = (value) => initData.filter(fl => fl.flight.legs.every(leg => leg.segments.length - 1 === value));

  const handleFilterByStops = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value === maxStops) {
      const sortedData = getSortedData(sortType, initData);
      setData(sortedData);
      setMaxStops(null);
    } else {
      const filteredData = filterByStops(value);
      const sortedData = getSortedData(sortType, filteredData);
      setData(sortedData);
      setMaxStops(value);
    }
  };

  const filterByPrice = (priceFrom, priceTo) => {
    const filteredData = initData.filter(({ flight: { price: { total: { amount } } } }) => amount >= priceFrom && amount <= priceTo);
    setData(filteredData);
    console.log(filteredData);
  };

  const filterByCompany = (value) => initData.filter(fl => fl.flight.carrier.caption === value);

  const handleFilterByCompany = (event) => {
    const value = event.target.value;
    if (chekedCompany.includes(value)) {
      const sortedData = getSortedData(sortType, initData);
      setData(sortedData);
      const newChekedCompany = chekedCompany.filter((c) => c !== value);
      setChekedCompany(newChekedCompany);
    } else {
      const filteredData = filterByCompany(value);
      setChekedCompany(prevItems => [...prevItems, value]);
      const sortedData = getSortedData(sortType, filteredData);
      setData(sortedData);
      console.log(sortedData);
    }
  };

  return (
    <div className="container d-flex">
      <div className="container position-sticky top-0 w-25 vh-100 pt-3">
        <Form className='mb-3'>
          <Form.Label className='fw-bold'>Сортировать</Form.Label>
          <Form.Check
            name="group1"
            label="По возрастанию цены"
            type='radio'
            value='incByPrice'
            id={`radio-1`}
            onChange={(e) => handleSort(e)}
          />
          <Form.Check
            name="group1"
            label="По убыванию цены"
            type='radio'
            value='decByPrice'
            id={`radio-2`}
            onChange={(e) => handleSort(e)}
          />
          <Form.Check
            name="group1"
            label="По времени в пути"
            type='radio'
            value='byTime'
            id={`radio-3`}
            onChange={(e) => handleSort(e)}
          />
        </Form>
        <Form className='mb-3'>
          <Form.Label className='fw-bold'>Фильтровать</Form.Label>
          <Form.Check
            name="group1"
            label="1 пересадка"
            type='checkbox'
            checked={maxStops === 1}
            value='1'
            id={`checkbox-1`}
            onChange={(e) => handleFilterByStops(e)}
          />
          <Form.Check
            name="group1"
            label="Без пересадок"
            type='checkbox'
            checked={maxStops === 0}
            value='0'
            id={`checkbox-2`}
            onChange={(e) => handleFilterByStops(e)}
          />
        </Form>
        <Form className='mb-3'>
          <Form.Label className='fw-bold'>Цена</Form.Label>
          <FloatingLabel controlId="priceFrom" label="От" className='mb-2'>
            <Form.Control
              type="number"
              placeholder="priceFrom"
              name='priceFrom'
              value={priceFrom}
              onChange={e => setPriceFrom(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="priceTo" label="До">
            <Form.Control
              type="number"
              placeholder="priceTo"
              name='priceTo'
              value={priceTo}
              onChange={e => setPriceTo(e.target.value)}
            />
          </FloatingLabel>
        </Form>
        <Form>
          <Form.Label className='fw-bold'>Авиакомпании</Form.Label>
          {uniqueNames.map((el, index) => {
            return (
              <Form.Check key={index}
                type='checkbox'
                label={el}
                value={el}
                checked={chekedCompany.includes(el)}
                onChange={e => handleFilterByCompany(e)}
              />
            )
          })}
        </Form>
      </div>
      <PaginationData data = {data}/>
    </div>
  )
};

export default App;
