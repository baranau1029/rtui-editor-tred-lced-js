import {createSelector as createSelectorOrm} from 'redux-orm';
import {UIState} from 'redux/uiSlice';
import {createSelector as createSelectorReselect} from 'reselect';

import orm from '../../orm';
import {Job} from '../slice';

export const jobSelector = (state: any) => state.job;
export const uiSelector = (state: any) => state.ui;

export const jobIdSelector = createSelectorReselect(jobSelector, (job: Job) => job.id);
export const jobStateSelector = createSelectorReselect(jobSelector, (job: Job) => job.state);
export const allJobDataSelector = createSelectorReselect(jobSelector, (job: Job) => job.jobData);

export const jobCurrentCaptionSelector = createSelectorReselect(uiSelector, (ui: UIState) => ui.selectedCaption);
export const audioPlayedFromSelector = createSelectorReselect(uiSelector, (ui: Job) => ui.audioPlayFrom);
export const uiLoadingSelector = createSelectorReselect(uiSelector, (ui: UIState) => ui.loading);
export const editorToolsSelected = createSelectorReselect(uiSelector, (ui: UIState) => ui.selected);
export const editorSlateValues = createSelectorReselect(uiSelector, (ui: UIState) => ui.editorValues);
export const validationSelector = createSelectorReselect(uiSelector, (ui: UIState) => ui.validation);
export const otherValidationSelector = createSelectorReselect(uiSelector, (ui: UIState) => ui.otherValidation);
export const issuesSelector = createSelectorReselect(uiSelector, (ui: UIState) => ui.issues);
export const modifiedBlockSelector = createSelectorReselect(uiSelector, (ui: UIState) => ui.blockModified);
export const saveClickedSelector = createSelectorReselect(uiSelector, (ui: UIState) => ui.saveClicked);
export const captionActiveToolsSelector = createSelectorReselect(uiSelector, (ui: UIState) => ui.captionActiveTools);



/* ORM selector */
export const jobsOrmSelector = createSelectorOrm(orm, (session: any) => session.Job.all().toRefArray());
