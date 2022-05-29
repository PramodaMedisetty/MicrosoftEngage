import React from 'react';
import { Link } from 'react-router-dom';
export default function PeopleCard({ content, small }) {
  return (
    <Link
      to={`/person/${content.id}-${content.name.toLowerCase().replaceAll(' ', '-')}`}
      className='card shadow fadeIn'
    >
      <img
        style={small ? { width: '168px', height: '250px' } : { width: '220px', height: '300px' }}
        className="mx-auto"
        src={`https://image.tmdb.org/t/p/original${content.profile_path}`}
        alt=''
      />
      <div className=''>
        <p className='p-0 m-0 text-center'>{content.name}</p>
        {content.character && <div className='text-dark text-center f10'>{content.character}</div>}
      </div>
    </Link>
  );
}
