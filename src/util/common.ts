import {ISelectedCaption} from 'types';

export const getKeyValueFromJobData = (key: string, jobData: any, captionSelected: ISelectedCaption) => {
  if (jobData.length) {
    return jobData[0].blocks[captionSelected.blockIndex]['subtitle-pairs'][captionSelected.pairIndex][key];
  }
};

export const getIssueByKey = (key: any, jobData: any, captionSelected: ISelectedCaption) => {
  if (jobData.length) {
    const data = getKeyValueFromJobData('issue-attachments', jobData, captionSelected);
    if (data.length) {
      return data[0].issue[key];
    }
  }
  return null;
};
