import {Dispatch} from 'react';
import {ui_setSelectedCaption} from 'redux/uiSlice';
import {Attachment, Block, Pair} from 'services/api.interfaces';
import {ISelectedCaption} from 'types';
import {hasCaptionError} from './captionValidation';

export const handlePendingCaption = (jobData: any, selectedCaption: ISelectedCaption, dispatch: Dispatch<any>) => {
  if (jobData?.length) {
    let stop = false;
    jobData[0].blocks.forEach((block: Block, BI: number) => {
      block['subtitle-pairs'].forEach((pair: Pair, PI: number) => {
        if (
          !stop &&
          pair['completion-status'] === 'pending' &&
          BI === selectedCaption.blockIndex &&
          PI > selectedCaption.pairIndex
        ) {
          dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
          stop = true;
        }

        if (!stop && pair['completion-status'] === 'pending' && BI > selectedCaption.blockIndex) {
          dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
          stop = true;
        }
        if (BI === jobData[0].blocks.length - 1 && PI === block['subtitle-pairs'].length - 1) {
          jobData[0].blocks.forEach((block: Block, BI: number) => {
            block['subtitle-pairs'].forEach((pair: Pair, PI: number) => {
              if (!stop && pair['completion-status'] === 'pending') {
                dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
                stop = true;
              }
            });
          });
        }
      });
    });
  }
};

export const handleInvalidCaption = (jobData: any, selectedCaption: ISelectedCaption, dispatch: Dispatch<any>) => {
  if (jobData?.length) {
    let stop = false;
    jobData[0].blocks.forEach((block: Block, BI: number) => {
      block['subtitle-pairs'].forEach((pair: Pair, PI: number) => {
        if (
          !stop &&
          BI === selectedCaption.blockIndex &&
          PI > selectedCaption.pairIndex &&
          hasCaptionError(pair.validations)
        ) {
          dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
          stop = true;
        }

        if (!stop && BI > selectedCaption.blockIndex && hasCaptionError(pair.validations)) {
          dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
          stop = true;
        }
        if (BI === jobData[0].blocks.length - 1 && PI === block['subtitle-pairs'].length - 1) {
          jobData[0].blocks.forEach((block: Block, BI: number) => {
            block['subtitle-pairs'].forEach((pair: Pair, PI: number) => {
              if (!stop && hasCaptionError(pair.validations)) {
                dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
                stop = true;
              }
            });
          });
        }
      });
    });
  }
};

export const handleFilterCaption = (jobData: any, selectedCaption: ISelectedCaption, dispatch: Dispatch<any>) => {
  if (jobData?.length) {
    let stop = false;
    jobData[0].blocks.forEach((block: Block, BI: number) => {
      block['subtitle-pairs'].forEach((pair: Pair, PI: number) => {
        if (
          !stop &&
          BI === selectedCaption.blockIndex &&
          PI > selectedCaption.pairIndex &&
          pair['issue-attachments'].length > 0
        ) {
          dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
          stop = true;
        }

        if (!stop && BI > selectedCaption.blockIndex && pair['issue-attachments'].length > 0) {
          dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
          stop = true;
        }
        if (BI === jobData[0].blocks.length - 1 && PI === block['subtitle-pairs'].length - 1) {
          jobData[0].blocks.forEach((block: Block, BI: number) => {
            block['subtitle-pairs'].forEach((pair: Pair, PI: number) => {
              if (pair['issue-attachments'].length > 0) {
                dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
                stop = true;
              }
            });
          });
        }
      });
    });
  }
};

export const issueFinded = (issues: Attachment[], type: string) => {
  let isFind = false;
  issues.forEach((is: Attachment) => {
    if (is.issue.status === type) {
      isFind = true;
    }
  });
  return isFind;
};

export const handleOpenOrResolvedCaption = (
  jobData: any,
  selectedCaption: ISelectedCaption,
  dispatch: Dispatch<any>,
  type: string,
) => {
  if (jobData?.length) {
    let stop = false;
    jobData[0].blocks.forEach((block: Block, BI: number) => {
      block['subtitle-pairs'].forEach((pair: Pair, PI: number) => {
        if (
          !stop &&
          BI === selectedCaption.blockIndex &&
          PI > selectedCaption.pairIndex &&
          issueFinded(pair['issue-attachments'], type)
        ) {
          dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
          stop = true;
        }

        if (!stop && BI > selectedCaption.blockIndex && issueFinded(pair['issue-attachments'], type)) {
          dispatch(ui_setSelectedCaption({blockIndex: BI, pairIndex: PI}));
          stop = true;
        }
        if (!stop && BI === jobData[0].blocks.length - 1 && PI === block['subtitle-pairs'].length - 1) {
          dispatch(ui_setSelectedCaption({blockIndex: 0, pairIndex: 0}));
        }
      });
    });
  }
};
