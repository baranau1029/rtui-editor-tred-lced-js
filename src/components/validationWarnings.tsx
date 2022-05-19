import React from 'react';

interface ValidationWarningsProps {
  heading?: string;
  children: React.ReactNode;
  externalClass?: string;
}

const ValidationWarnings = ({heading = '', children, externalClass = ''}: ValidationWarningsProps): JSX.Element => {
  return (
    <div className={`alert alert-warning mb-0 ${externalClass}`}>
      <h4 className="alert-heading">
        <i className="far fa-exclamation-triangle " /> {heading ? heading : 'Validation warnings'}
      </h4>
      {children}
    </div>
  );
};

export default ValidationWarnings;
