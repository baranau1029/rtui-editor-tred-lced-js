import {Text} from 'slate';
import escapeHtml from 'escape-html';
import {Block, Entity} from 'services/api.interfaces';
import {cloneDeep} from 'lodash';
import {Dispatch} from 'react';
import {actionTypes} from 'services/actionTypes';

export const editorStringNormalize = (
  blockModified: string[],
  editorValues: any,
  jobData: Entity,
  allData: any,
  dispatch: Dispatch<any>,
) => {
  const newBlocks: Block[] | undefined = cloneDeep(jobData.blocks);
  const newBlockIndexes: number[] = [];
  let updatedBlocks: Block[] = [];
  if (newBlocks) {
    blockModified.forEach((item: string) => {
      const blockPairIndex: string[] = item.split('');
      newBlockIndexes.push(parseInt(blockPairIndex[0]));
      const values: any = editorValues[parseInt(blockPairIndex[0])][parseInt(blockPairIndex[1])];
      let string = '';
      values.forEach((item: any) => {
        string += serialize(item);
      });
      newBlocks[parseInt(blockPairIndex[0])]['subtitle-pairs'][parseInt(blockPairIndex[1])].target.html = string;
    });
    newBlockIndexes.forEach((index: number) => {
      updatedBlocks.push(newBlocks[index]);
    });
  }

  updatedBlocks = updatedBlocks.map((item: Block) => {
    const data: any = {...item};
    data.index = data['alleds-block/index'];
    delete data['alleds-block/index'];
    return data;
  });

  const sgEntities = allData['sg-entities'].filter((item: Entity) => item['alleds-translation-job/id']);
  const userData = allData['sg-entities'].filter((item: Entity) => item['user/id']);
  const apiData = {
    'save-trigger': 'save-button',
    'translation-job-id': allData.data['current-translation-job-id'],
    'translation-job': {...sgEntities[0], blocks: updatedBlocks},
    // cef: `${userData[0].name.split(' ').join('_')}-${getDate()}-Chrome-Windows-005`,
    cef: 'dzmitry_baranau-Jan-28-2022:10:20:12-Chrome-Windows-005',
  };
  apiData['translation-job'].id = apiData['translation-job-id'];
  apiData['translation-job'].progress = [];
  delete apiData['translation-job']['alleds-translation-job/id'];
  delete apiData['translation-job']['curated-translation-memory'];
  delete apiData['translation-job']['source-file'];
  delete apiData['translation-job']['target-language-code-3'];
  delete apiData['translation-job']['progress-tracking'];
  delete apiData['translation-job']['source-file'];
  dispatch({type: actionTypes.SAVE_JOB, data: apiData});
};

export const reviewModeNodeSerialize = (nodes: any) => {
  let targetString: any = [];
  nodes.forEach((node: any, pairIndex: number) => {
    node.forEach((item: any) => {
      targetString.push({pairIndex, htmlString: serialize(item)});
    });
  });
  return targetString;
};

export const serialize = (node: any) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);
    if ((node as any).bold) {
      string = `<span class="rtui-ial-class-bold">${string}</span>`;
    }
    if ((node as any).talic) {
      string = `<span class="rtui-ial-class-italic">${string}</span>`;
    }
    if ((node as any).underline) {
      string = `<span class="rtui-ial-class-underline">${string}</span>`;
    }
    if ((node as any).superscript) {
      string = `<span class="rtui-ial-class-superscript">${string}</span>`;
    }
    if ((node as any).subscript) {
      string = `<span class="rtui-ial-class-subscript">${string}</span>`;
    }
    if ((node as any).smallcaps) {
      string = `<span class="rtui-ial-class-smallcaps">${string}</span>`;
    }
    if ((node as any).number) {
      string = `<span class="rtui-ial-class-pn">${string}</span>`;
    }
    if ((node as any).mark) {
      string = `<span class="rtui-gap_mark">${string}</span>`;
    }
    return string;
  }

  const children = node.children.map((n: any) => serialize(n)).join('');

  switch (node.type) {
    case 'paragraph':
      return `<span class="paragraph">${children}</span>`;
    case 'paragraph-number':
      return `<span class="rtui-ial-class-pn">${children}</span>`;
    case 'mark':
      return `<span class="rtui-gap_mark">${children}</span>`;
    default:
      return children;
  }
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const getDate = () => {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();
  const day = date.getDay();
  const hours = date.getHours();
  const mint = date.getMinutes();
  const sec = date.getSeconds();

  return `${months[month]}-${day}-${year}:${hours}:${mint}:${sec}`;
};
