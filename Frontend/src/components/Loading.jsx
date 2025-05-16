import React from 'react';
import loadingIcon from '@/assets/images/loading.svg';

const Loading = () => {
  return (
    <div
      role="alert"
      aria-busy="true"
      className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
    >
      <img src={loadingIcon} alt="Loading..." width={100} />
    </div>
  );
};

export default Loading;
