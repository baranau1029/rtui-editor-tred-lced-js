import cloneDeep from 'lodash/cloneDeep';
import {JobStatus} from './../services/enums';
import {IJob} from 'types';
import {attr, Model} from 'redux-orm';
import {actionTypes} from '../services/actionTypes';
import {Entity} from 'services/api.interfaces';
import {isNumber} from 'lodash';

const updateMark = (blockIndex: any, pairIndex: number, job: Entity, blocks: any, keyName: string, count?: number) => {
  const target = blocks[blockIndex]['subtitle-pairs'][pairIndex].validations[keyName].target;
  const source = blocks[blockIndex]['subtitle-pairs'][pairIndex].validations[keyName].source;
  let newTaget;
  if (isNumber(count)) {
    newTaget = blocks[blockIndex]['subtitle-pairs'][pairIndex].validations[keyName].target = count;
    if (newTaget === source) {
      blocks[blockIndex]['subtitle-pairs'][pairIndex].validations[keyName].valid = true;
    } else {
      blocks[blockIndex]['subtitle-pairs'][pairIndex].validations[keyName].valid = false;
    }
  } else {
    if (target < source) {
      newTaget = blocks[blockIndex]['subtitle-pairs'][pairIndex].validations[keyName].target += 1;

      if (newTaget === source) {
        blocks[blockIndex]['subtitle-pairs'][pairIndex].validations[keyName].valid = true;
      } else {
        blocks[blockIndex]['subtitle-pairs'][pairIndex].validations[keyName].valid = false;
      }
    } else {
      blocks[blockIndex]['subtitle-pairs'][pairIndex].validations[keyName].valid = true;
    }
  }

  job.blocks = blocks;
};

class Job extends Model<any, Entity> {
  static reducer(action: any, Job: any, _session: any) {
    switch (action.type) {
      case actionTypes.UPSERT_JOB:
        Job.upsert(action.payload);
        break;
      case actionTypes.UPDATE_SUBTITLES: {
        break;
      }
      case actionTypes.PAIR_COMPLETION_STATUS_PENDING: {
        const {jobId, blockIndex, pairIndex} = action.payload;

        const job: Entity = Job.withId(jobId);
        const blocks: any = cloneDeep(job.blocks);
        blocks[blockIndex]['subtitle-pairs'][pairIndex]['completion-status'] = JobStatus.pending;
        job.blocks = blocks;
        break;
      }
      case actionTypes.TOGGLE_PAIR_COMPLETION_STATUS: {
        const {jobId, blockIndex, pairIndex} = action.payload;

        const job: Entity = Job.withId(jobId);
        const blocks: any = cloneDeep(job.blocks);
        const status =
          blocks[blockIndex]['subtitle-pairs'][pairIndex]['completion-status'] === JobStatus.completed
            ? JobStatus.pending
            : JobStatus.completed;
        blocks[blockIndex]['subtitle-pairs'][pairIndex]['completion-status'] = status;
        job.blocks = blocks;
        break;
      }
      case actionTypes.UPDATE_GAP_MARK: {
        const {jobId, blockIndex, pairIndex} = action.payload;

        const job: Entity = Job.withId(jobId);
        const blocks: any = cloneDeep(job.blocks);
        updateMark(blockIndex, pairIndex, job, blocks, 'gap-marks');
        break;
      }
      case actionTypes.UPDATE_EAGLE_MARK: {
        const {jobId, blockIndex, pairIndex} = action.payload;

        const job: Entity = Job.withId(jobId);
        const blocks: any = cloneDeep(job.blocks);
        updateMark(blockIndex, pairIndex, job, blocks, 'eagles');
        break;
      }
      case actionTypes.UPDATE_PARAGRAPH_MARK: {
        const {jobId, blockIndex, pairIndex, valid} = action.payload;

        const job: Entity = Job.withId(jobId);
        const blocks: any = cloneDeep(job.blocks);
        const paragraphNumbers = blocks[blockIndex]['subtitle-pairs'][pairIndex].validations['paragraph-numbers'];
        if (!valid) {
          paragraphNumbers.target = [];
          paragraphNumbers.valid = valid;
        } else {
          paragraphNumbers.target = paragraphNumbers.source;
          paragraphNumbers.valid = valid;
        }
        job.blocks = blocks;
        break;
      }

      case actionTypes.UPDATE_GAP_MARK_DIRECTLY: {
        const {jobId, blockIndex, count, pairIndex} = action.payload;

        const job: Entity = Job.withId(jobId);
        const blocks: any = cloneDeep(job.blocks);
        updateMark(blockIndex, pairIndex, job, blocks, 'gap-marks', count);
        break;
      }
      case actionTypes.UPDATE_EAGLE_MARK_DIRECTLY: {
        const {jobId, blockIndex, count, pairIndex} = action.payload;

        const job: Entity = Job.withId(jobId);
        const blocks: any = cloneDeep(job.blocks);
        updateMark(blockIndex, pairIndex, job, blocks, 'eagles', count);
        break;
      }
      default:
        break;
    }
  }

  static modelName = 'Job' as const;

  static fields = {
    'alleds-translation-job/id': attr(),
    blocks: attr(),
    'config-rtui': attr(),
    'curated-translation-memory': attr(),
    'job-step': attr(),
    'job-type': attr(),
    'last-synced-at': attr(),
    'lock-version': attr({getDefault: () => 'Default VERSION'}),
    policies: attr(),
    'progress-tracking': attr(),
    'source-file': attr(),
    state: attr(),
    'target-file': attr(),
    'target-language-chars': attr(),
    'target-language-code-3': attr(),
    'workflow-step': attr(),
  };

  static options = {
    idAttribute: 'id' as const,
  };
}

export default Job;
