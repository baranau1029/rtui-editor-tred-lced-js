import React from 'react';
import './style.scss';

const Toasters = () => {
  return (
    <div className="toaster-wrappers">
      <div
        id="jobSuccessToast"
        className="toast toast-success m-1"
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        <div className="toast-header header-success d-flex justify-content-between">
          <strong className="mr-auto">Saved</strong>
          <button
            type="button"
            className="btn-close toast-btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
        <div className="toast-body">The job was saved.</div>
      </div>
      <div
        id="captionError"
        className="toast toast-warning m-1"
        role="alert"
        aria-live="assertive"
        aria-atomic="true">
        <div className="toast-header header-waring d-flex justify-content-between">
          <strong className="mr-auto">Validation error</strong>
          <button
            type="button"
            className="btn-close toast-btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"></button>
        </div>
        <div className="toast-body">This caption has validation issues and cannot be marked as 'completed</div>
      </div>
    </div>
  );
};

export default Toasters;
