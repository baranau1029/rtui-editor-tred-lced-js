import React from 'react';
import {MarkButton} from './editorTools';

interface ToolsProps {
  index: number | string;
  selected: any;
  handleCurentActiveTools: (v: any, index: any) => void;
}

const Tools = ({index, selected, handleCurentActiveTools}: ToolsProps) => {
  return (
    <div className="editor-tool">
      <div role="group" className="btn-group mr-1">
        <MarkButton
          id={`bold-btn-${index}`}
          index={index}
          format="bold"
          text="B"
          className={`btn btn-md bold-btn-${index} ${selected.includes('bold') ? 'btn-secondary' : 'btn-light'}`}
          selected={selected}
          onClick={(v: any) => handleCurentActiveTools(v, index)}
        />
        <MarkButton
          id={`italic-btn-${index}`}
          index={index}
          format="italic"
          text="I"
          className={`btn btn-md italic-btn-${index} ${selected.includes('italic') ? 'btn-secondary' : 'btn-light'}`}
          selected={selected}
          onClick={(v: any) => handleCurentActiveTools(v, index)}
        />
        <MarkButton
          id={`underline-btn-${index}`}
          index={index}
          format="underline"
          text="U"
          className={`btn btn-md underline-btn-${index} ${
            selected.includes('underline') ? 'btn-secondary' : 'btn-light'
          }`}
          icon="format_underlined"
          selected={selected}
          onClick={(v: any) => handleCurentActiveTools(v, index)}
        />
        <MarkButton
          id={`superscript-btn-${index}`}
          index={index}
          format="superscript"
          text="super"
          className={`btn btn-md  superscript-btn-${index} ${
            selected.includes('superscript') ? 'btn-secondary' : 'btn-light'
          }`}
          icon="code"
          selected={selected}
          onClick={(v: any) => handleCurentActiveTools(v, index)}
        />
        <MarkButton
          id={`subscript-btn-${index}`}
          index={index}
          format="subscript"
          text="sub"
          className={`btn btn-md subscript-btn-${index} ${
            selected.includes('subscript') ? 'btn-secondary' : 'btn-light'
          }`}
          icon="looks_one"
          selected={selected}
          onClick={(v: any) => handleCurentActiveTools(v, index)}
        />
        <MarkButton
          id={`smallcaps-btn-${index}`}
          index={index}
          format="smallcaps"
          text="small"
          className={`btn btn-md smallcaps-btn-${index} ${
            selected.includes('smallcaps') ? 'btn-secondary' : 'btn-light'
          }`}
          icon="looks_two"
          selected={selected}
          onClick={(v: any) => handleCurentActiveTools(v, index)}
        />
      </div>
    </div>
  );
};

export default Tools;
