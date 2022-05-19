import {Transforms} from 'slate';

export const withSingleLine = (editor: any) => {
  const {normalizeNode} = editor;

  editor.normalizeNode = ([node, path]: any) => {
    if (path.length === 0) {
      if (editor.children.length > 1) {
        Transforms.mergeNodes(editor);
      }
    }

    return normalizeNode([node, path]);
  };

  return editor;
};
