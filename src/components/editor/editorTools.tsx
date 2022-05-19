import React, {useCallback, useMemo, useState} from 'react';
import isHotkey from 'is-hotkey';
import {Editable, withReact, useSlate, Slate} from 'slate-react';
import {Editor, createEditor, Descendant} from 'slate';
import {withHistory} from 'slate-history';
import {Toolbar} from './editorComponents';
import {cursorFocusOnEditor} from 'helper/domManupulation';
import {ui_setCaptionActiveTools} from 'redux/uiSlice';
import store from 'redux/store';

export const HOTKEYS: any = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
};

const EditorTools = () => {
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const renderElement = useCallback((props) => <Element {...props} />, []);
  const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
  const editor = useMemo(() => withHistory(withReact(createEditor() as any)), []);
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      const newSelected = [...selected];
      const index = newSelected.indexOf(value);
      newSelected.splice(index, 1);
      setSelected(newSelected);
    } else {
      const newSelected = [...selected];
      newSelected.push(value);
      setSelected(newSelected);
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={(value) => setValue(value)}>
      <Toolbar className="btn-light-gray">
        <MarkButton format="bold" text="B" clasName="tool-bold" selected={selected} onClick={handleSelect} />
        <MarkButton format="italic" text="I" selected={selected} onClick={handleSelect} />
        <MarkButton format="underline" text="U" icon="format_underlined" selected={selected} onClick={handleSelect} />
        <MarkButton format="superscript" text="super" icon="code" selected={selected} onClick={handleSelect} />
        <MarkButton format="subscript" text="sub" icon="looks_one" selected={selected} onClick={handleSelect} />
        <MarkButton format="smallcaps" text="small" icon="looks_two" selected={selected} onClick={handleSelect} />
      </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={(event) => {
          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event as any)) {
              event.preventDefault();
              const mark = HOTKEYS[hotkey];
              toggleMark(editor, mark);
            }
          }
        }}
      />
    </Slate>
  );
};

export const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
  const toolsObj: any = Editor.marks(editor);
  if(toolsObj){
    const tools = Object.keys(toolsObj);
    store.dispatch(ui_setCaptionActiveTools(tools));
  }
};

const isMarkActive = (editor: any, format: any) => {
  const marks: any = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const Element = ({attributes, children, element}: any) => {
  switch (element.type) {
    case 'paragraph-number':
      return (
        <span className="rtui-ial-class-pn" {...attributes}>
          {children}
        </span>
      );
    case 'mark':
      return (
        <span className="rtui-gap_mark" {...attributes}>
          {children}
        </span>
      );
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    default:
      return <span>{children}</span>;
  }
};

export const Leaf = ({attributes, children, leaf, style}: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }

  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }

  if (leaf.smallcaps) {
    children = <small style={{textTransform: 'uppercase', backgroundColor: 'rgba(58,102,219,0.17)'}}>{children}</small>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.mark) {
    children = <span className="rtui-gap_mark">{children}</span>;
  }
  if (leaf.number) {
    children = <span className="rtui-ial-class-pn">{children}</span>;
  }
  if (leaf.eagle) {
    children = <span className="rtui-eagle">{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};

const getButton = (format: string) => {
  switch (format) {
    case 'bold': {
      return (
        <p className="tool">
          <b>B</b>
        </p>
      );
    }
    case 'italic': {
      return (
        <p className="tool">
          <i>I</i>
        </p>
      );
    }
    case 'underline': {
      return (
        <p className="tool">
          <u>U</u>
        </p>
      );
    }
    case 'superscript': {
      return (
        <p className="tool">
          X<sup>2</sup>
        </p>
      );
    }
    case 'subscript': {
      return (
        <p className="tool">
          X<sub>2</sub>
        </p>
      );
    }
    case 'smallcaps': {
      return (
        <p className="tool">
          T<small>T</small>
        </p>
      );
    }
  }
};

export const MarkButton = ({format, onClick, selected, className, id, index}: any) => {
  const editor = useSlate();

  return (
    <button
      id={id}
      className={className}
      onClick={(event: any) => {
        event.preventDefault();
        onClick(format);
        toggleMark(editor, format);
        cursorFocusOnEditor(index);
      }}>
      {getButton(format)}
    </button>
  );
};

export const initialValue: any = [
  {
    type: 'paragraph',
    children: [{text: 'This is editable '}],
  },
];

export default EditorTools;
