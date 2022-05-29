import React from 'react';
import { Link } from 'react-router-dom';
import RatingBar from './RatingBar';
export default function Contentcard({ content, height }) {
  return (
    <Link to={`/${content.name ? 'tv' : 'movie'}/${content.id}`} className='content-card fadeIn'>
      <div className='position-relative'>
        <img
          height={height ? height : '300px'}
          style={{ borderRadius: '30px', minWidth: '200px', overflow: 'hidden' }}
          className='shadow'
          src={`https://image.tmdb.org/t/p/original${content.poster_path}`}
          alt=''
        />
        <div
          style={{ borderRadius: '30px', height: height ? height : '300px', width: '200px', overflow: 'hidden' }}
          className='detail-wrapper'
        >
          <h5 className='text-center'>{content.name || content.title}</h5>
          <p className='release text-center'>Release Date: {content.first_air_date || content.release_date}</p>
          <p className='p-0 m-0 small'>Overview:</p>
          <p className='overview'> {content.overview}</p>
          <div className='rounded rating p-1'>
            <p className='m-0 small'>Rating:</p>
            <div className='text-center p-1'>
              <RatingBar percentage={Math.round(content.vote_average * 10)} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
