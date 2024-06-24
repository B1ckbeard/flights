import React, { useState, useMemo, useEffect } from 'react';
import DisplayData from './DisplayData';

const PaginationData = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;

  const currentTableData = useMemo(() => {
    const firstPageIndex = 0;
    const lastPageIndex = (firstPageIndex + currentPage) * pageSize;
    const newData = data.slice(firstPageIndex, lastPageIndex);
    console.log(newData);
    return newData;
  }, [currentPage, data]);

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handleClickSeeMore = () => {
    setCurrentPage(currentPage + 1)
    console.log('currentPage', currentPage);
  };

  return (
    <div className="container w-75 py-3">
      <DisplayData data={currentTableData} />
      <div className="text-center">
        <button type="button" className="btn btn-primary w-50" onClick={() => handleClickSeeMore()}>Показать еще</button>
      </div>
    </div>
  )
};

export default PaginationData;
