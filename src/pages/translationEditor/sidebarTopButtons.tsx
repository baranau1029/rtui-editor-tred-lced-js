import {EditorMode} from 'components/editor/editorRow';
import React from 'react';

interface SidebarTopButtonsProps {
  mode: EditorMode;
  handleMode: (mode: EditorMode) => void;
}

const SidebarTopButtons = ({mode, handleMode}: SidebarTopButtonsProps) => {
  return (
    <div className="rtui-tred-toolbar-tools">
      <div role="group" aria-label="Mode selector buttons" className="btn-group">
        <button
          className={`btn ${mode === EditorMode.edit ? 'btn-secondary' : 'btn-light'} `}
          onClick={() => handleMode(EditorMode.edit)}>
          Edit
        </button>
        <button
          className={`btn ${mode === EditorMode.review ? 'btn-secondary' : 'btn-light'} `}
          onClick={() => handleMode(EditorMode.review)}>
          Review
        </button>
      </div>
      <button className="ml-1 btn btn-light" data-bs-toggle="modal" data-bs-target="#jobinfo">
        Translation Job info
      </button>
    </div>
  );
};

export default SidebarTopButtons;
