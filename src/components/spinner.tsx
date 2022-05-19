import React from 'react';

const Spinner = () => {
  return (
    <div className="spinner-loading text-muted d-flex justify-content-center align-items-center">
      <div>
        <h1 className="display-1">
          <i className="fas fa-spinner fa-spin"></i>
        </h1>
        <h4>Loading...</h4>
      </div>
    </div>
  );
};

export default Spinner;
