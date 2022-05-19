import {htmlInput, htmlSelect, htmlTextArea, syntheticEvent} from 'interfaces/ui';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {actionTypes} from 'services/actionTypes';
import {StorageKeys} from 'services/enums';
import {getValueFromLocalStorage} from 'util/storage';
import {IssuesDataInterface} from './chatting';

interface Props {
  assignees: any;
  issueTypes: any;
}

const IssueForm = ({assignees, issueTypes}: Props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<IssuesDataInterface>({
    issueId: 0,
    comments: [],
    assigneeId: '',
    issueTypeId: 0,
    title: '',
    description: '',
    attachmentId: '',
    jobId: '',
    lockVersion: 0,
    workFlowId: '',
  });

  useEffect(() => {
    const issuesInfo: IssuesDataInterface | null = getValueFromLocalStorage(StorageKeys.editIssues);
    if (issuesInfo) {
      setFormData({
        issueId: issuesInfo.issueId,
        title: issuesInfo.title,
        description: issuesInfo.description,
        comments: issuesInfo.comments,
        assigneeId: issuesInfo.assigneeId,
        issueTypeId: issuesInfo.issueTypeId,
        attachmentId: issuesInfo.attachmentId,
        jobId: issuesInfo.jobId,
        lockVersion: issuesInfo.lockVersion,
        workFlowId: issuesInfo.workFlowId,
      });
    }
  }, []);

  const handleTitleChange = (e: htmlInput) => {
    setFormData({...formData, title: e.target.value});
  };
  const handleDesciptionChange = (e: htmlTextArea) => {
    setFormData({...formData, description: e.target.value});
  };
  const handleAssigneeChange = (e: htmlSelect) => {
    setFormData({...formData, assignee: e.target.value});
  };
  const handleIssueTypeChange = (e: htmlSelect) => {
    setFormData({...formData, issueType: e.target.value});
  };

  const handleSubmit = (e: syntheticEvent) => {
    e.preventDefault();
    const data = {
      'issue-attachment': {
        'issue-attributes': {
          'assignee-id': formData.assigneeId,
          description: formData.description,
          'issue-type-class': formData.issueTypeId,
          'lock-version': formData.lockVersion,
          'target-workflow-step-id': formData.workFlowId,
          title: formData.title,
        },
      },
      'issue-id': formData.issueId,
      'translation-job-id': formData.jobId,
    };
    dispatch({type: actionTypes.UPDATE_ISSUE, attachmentId: formData.attachmentId, data});
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="required" htmlFor="title">
          Title
        </label>
        <input
          className="form-control"
          id="title"
          name="title"
          required
          type="text"
          value={formData.title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          style={{height: '10rem'}}
          value={formData.description}
          onChange={handleDesciptionChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="assignee_id">Assignee</label>
        <select
          className="form-control"
          id="assignee_id"
          name="assignee_id"
          value={formData.assigneeId}
          onChange={handleAssigneeChange}>
          <option>- None -</option>
          {assignees.map((item: any) => (
            <option key={item[1]} value={item[1]}>
              {item[0]}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="issue_type_class">Issue Type</label>
        <select
          className="form-control"
          id="issue_type_class"
          name="issue_type_class"
          value={formData.issueTypeId}
          onChange={handleIssueTypeChange}>
          {issueTypes.map((item: any) => (
            <option key={item[1]} value={item[1]}>
              {item[0]}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" id="updateIssueButton" className="d-none">
        submit
      </button>
    </form>
  );
};

export default IssueForm;
