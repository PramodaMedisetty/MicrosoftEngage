import React from 'react';
import * as _ from 'lodash';
import { Pagination } from 'react-bootstrap';

export default ({ pager, onClick }) => {
  if (!pager) {
    return null;
  }

  if (pager.totalPages < 1) {
    return null;
  }

  const onPageClick = (e, page) => {
    e.preventDefault();
    e.stopPropagation();
    onClick(page);
  };

  const pageStart = pager.currentPage - 10 < 0 ? 1 : pager.currentPage - 8;
  const pageEnd = pager.currentPage + 10 > pager.totalPages ? pager.totalPages : pager.currentPage + 8;
  const hasEndEllipsis = pageEnd < pager.totalPages;
  const hasStartEllipsis = pageStart > 1;

  const items = _.range(pageStart, pageEnd);

  const pagerItems =
    (items &&
      items.length > 0 &&
      items.map((page) => (
        <Pagination.Item active={pager.currentPage === page} key={page} onClick={(e) => onPageClick(e, page)}>
          {page}
        </Pagination.Item>
      ))) ||
    [];

  if (hasStartEllipsis) {
    pagerItems.unshift(<Pagination.Item key='next'> ... </Pagination.Item>);
  }

  if (pager.hasPreviousPage) {
    pagerItems.unshift(
      <Pagination.Item key='prev' onClick={(e) => onPageClick(e, pager.currentPage - 1)}>
        Previous
      </Pagination.Item>
    );
  }

  if (pager.currentPage !== 1) {
    pagerItems.unshift(
      <Pagination.Item key='first' onClick={(e) => onPageClick(e, 1)}>
        First Page
      </Pagination.Item>
    );
  }

  if (hasEndEllipsis) {
    pagerItems.push(<Pagination.Item key='next'>...</Pagination.Item>);
  }

  if (pager.hasNextPage) {
    pagerItems.push(
      <Pagination.Item key='next' onClick={(e) => onPageClick(e, pager.currentPage + 1)}>
        Next
      </Pagination.Item>
    );
  }

  if (pager.currentPage !== pager.totalPages) {
    pagerItems.push(
      <Pagination.Item key='last' onClick={(e) => onPageClick(e, pager.totalPages)}>
        Last Page
      </Pagination.Item>
    );
  }

  return <Pagination style={{ margin: '0 auto' }}>{pagerItems}</Pagination>;
};
