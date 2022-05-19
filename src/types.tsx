import {JobStatus} from 'services/enums';

export interface IJob {
  blocks: IBlock[];
  id: string;
  lockVersion: number;
  sourceFile: {
    audioFileUrl: string;
    contentType: string;
    dateCode: string;
    stids: string[];
  };
  state: JobStatus;
  targetLanguageCode3: string;
  captionLength: number;
}

export interface IBlock {
  audio: {
    durationMsec: number;
    startMsec: number;
  };
  classes: string[];
  index: number;
  stids: string[];
  subtitlePairs: ISubtitlePair[];
  type: string;
}

export interface ISubtitlePair {
  stid: string;
  blockClasses: string[];
  blockEl: string;
  blockIndex: number;
  completionStatus: string;
  source: {
    audio: {
      newDurationMsec: number;
      newStartMsec: number;
      originalDurationMsec: number;
      originalStartMsec: number;
    };
    gitCommit: string;
    html: string;
  };
  target: {
    gitCommit: string;
    html: string;
  };
}

export interface IDragItem {
  item: string;
  dropIndex: number;
  caption: string;
  blockIndex: number;
  pairIndex: number;
  index: number;
  captionId: number;
}

export interface IPrevPair {
  blockIndex: number;
  caption: string;
  pairIndex: number;
}

export interface ISelectedCaption {
  blockIndex: number;
  pairIndex: number;
  // characterLength: number;
  // newCharacterLength: number;
  // isDragging: boolean;
  // captionId: number;
}
