import React from 'react';

interface ModalProps {
  name: string;
  id: string;
  children: React.ReactNode;
  externalClass?: string;
  showIcon?: boolean;
  footer?: React.ReactNode | null;
}

const Modal = ({name, id, externalClass = '', footer, showIcon = false, children}: ModalProps): JSX.Element => {
  return (
    <div
      className="modal fade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby={id}
      aria-hidden="true"
      >
      <div className={`modal-dialog ${externalClass}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id={id}>
              {showIcon && <i className="fas fa-comment-exclamation mr-1"></i>}
              {name}
            </h4>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">{children}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
};

export default Modal;
