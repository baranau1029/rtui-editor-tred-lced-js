import {cursorFocusOnEditor} from 'helper/domManupulation';
import {ISelectedCaption} from 'types';

export const handleEditorToolsButton = (type: string, captionSelected: ISelectedCaption) => {
  const element: any = document.querySelector(`.${type}-btn-${captionSelected.blockIndex}${captionSelected.pairIndex}`);

  if (element) {
    element.click();
  }
  cursorFocusOnEditor(`${captionSelected.blockIndex}${captionSelected.pairIndex}`);
};

interface EditorTopToolsProps {
  captionSelected: ISelectedCaption;
  selected: string[];
}

const EditorTopTools = ({captionSelected, selected}: EditorTopToolsProps) => {

  const handleEditorButton = (type: string, captionSelected: ISelectedCaption) => {
    handleEditorToolsButton(type, captionSelected);
  };


  return (
    <div className="btn-light-gray">
      <div role="group" className="btn-group mr-1">
        <button
          className={`btn btn-md ${selected.includes('bold') ? 'btn-secondary' : 'btn-light'}`}
          onClick={() => handleEditorButton('bold', captionSelected)}>
          <b>B</b>
        </button>
        <button
          className={`btn btn-md ${selected.includes('italic') ? 'btn-secondary' : 'btn-light'}`}
          onClick={() => handleEditorButton('italic', captionSelected)}>
          <i>I</i>
        </button>
        <button
          className={`btn btn-md ${selected.includes('underline') ? 'btn-secondary' : 'btn-light'}`}
          onClick={() => handleEditorButton('underline', captionSelected)}>
          <u>U</u>
        </button>
        <button
          className={`btn btn-md ${selected.includes('superscript') ? 'btn-secondary' : 'btn-light'}`}
          onClick={() => handleEditorButton('superscript', captionSelected)}>
          X<sup>2</sup>
        </button>
        <button
          className={`btn btn-md ${selected.includes('subscript') ? 'btn-secondary' : 'btn-light'}`}
          onClick={() => handleEditorButton('subscript', captionSelected)}>
          X<sub>2</sub>
        </button>
        <button
          className={`btn btn-md ${selected.includes('smallcaps') ? 'btn-secondary' : 'btn-light'}`}
          onClick={() => handleEditorButton('smallcaps', captionSelected)}>
          T<small>T</small>
        </button>
      </div>
    </div>
  );
};

export default EditorTopTools;
