import React, { useEffect, useState } from 'react';
import { getPopularPeople } from '../apis';
import LoadingSpinner from '../Components/LoadingSpinner';
import Pager from '../Components/Pager';
import PeopleCard from '../Components/PeopleCard';

export default function People() {
  const [page, setpage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalPages, settotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchPeople(page);
  }, []);

  const fetchPeople = (selectedpage) => {
    setLoading(true);
    setpage(selectedpage);
    getPopularPeople(selectedpage)
      .then((res) => {
        setResults(res.results);
        settotalPages(res.total_pages);
        setLoading(false);
      })
      .catch((errerr) => {
        console.log(errerr);
      });
  };

  return (
    <div className='container view-port-wrapper'>
      <div className='mt-3'></div>
      <p className='sub-heading py-3'>Popular People</p>
      <div className='row no-gutters fadeIn'>
        <LoadingSpinner isLoading={loading}>
          {results &&
            results.length > 0 &&
            results.map((p) => (
              <div className='col m-2'>
                <PeopleCard key={p.id} content={p} />
              </div>
            ))}
        </LoadingSpinner>
      </div>
      <div className='d-flex justify-content-center my-3'>
        <Pager pager={{ totalPages, currentPage: page }} onClick={fetchPeople} />
      </div>
    </div>
  );
}
