import {jsx} from 'slate-hyperscript';

export const deserialize = (el: any): any => {
  if (el.nodeType === 3) {
    return el.textContent;
  }
  if (el.nodeType !== 1) {
    return null;
  }

  let children = Array.from(el.childNodes).map(deserialize);

  if (children.length === 0) {
    children = [{text: ''}];
  }

  switch (String(el.classList['value']).trim()) {
    // Elements:
    case '':
      return jsx('fragment', {}, children);
    case 'paragraph':
      return jsx('element', {type: 'paragraph'}, children);

    // Leafs:
    case 'rtui-ial-class-bold':
      return {text: el.textContent, bold: true};
    case 'rtui-gap_mark':
      return {text: el.textContent, mark: true};
    case 'rtui-ial-class-pn':
      return {text: el.textContent, number: true};
    case 'rtui-ial-class-italic':
      return {text: el.textContent, italic: true};
    case 'rtui-ial-class-superscript':
      return {text: el.textContent, superscript: true};
    case 'rtui-ial-class-subscript':
      return {text: el.textContent, subscript: true};
    case 'rtui-ial-class-smcaps':
      return {text: el.textContent, smallcaps: true};
    case 'rtui-eagle':
      return {text: el.textContent, eagle: true};

    default:
      return el.textContent;
  }
};
