import React from 'react';
import {useDispatch} from 'react-redux';
import {actionTypes} from 'services/actionTypes';

interface Props {
  data: any;
}

const ChattingIssueTable = ({data}: Props) => {
  const dispatch = useDispatch();

  const handleFlagAndMark = () => {
    dispatch({
      type: actionTypes.FLAG_FOR_REVIEW,
      attachmentId: data.attachmentId,
      end: data?.reviwer ? 'flag_for_review' : 'mark_as_reviewed',
      data: {
        'issue-id': data.issueId,
        'issue-lock-version': data.lockVersion,
        'translation-job-id': data.jobId,
      },
    });
  };

  return (
    <div className="table-responsive">
      <table className="table table-borderless table-sm mb-1">
        <tbody>
          <tr>
            <td className="text-muted text-right">Status</td>
            <td className="w-100">
              <span className="data-tag data-tag-danger">{data?.status}</span>
            </td>
          </tr>
          <tr>
            <td className="text-muted text-right">Assignee</td>
            <td>
              <span className="data-tag data-tag-light">{data?.assignee}</span>
            </td>
          </tr>
          <tr>
            <td className="text-muted text-right">Review</td>
            <td>
              {data?.reviwer && 'Reviewed by'}
              {data?.reviwer && <span className="data-tag data-tag-light">{data?.reviwer}</span>}
              <button type="button" className="btn-secondary btn-sm mr-1 btn btn-primary" onClick={handleFlagAndMark}>
                {data?.reviwer ? 'Flag for review' : 'Mark as reviewed'}
              </button>
            </td>
          </tr>
          <tr>
            <td className="text-muted text-right">Target</td>
            <td>
              <span className="data-tag data-tag-light">{data?.target}</span>
            </td>
          </tr>
          <tr>
            <td className="text-muted text-right text-nowrap">Issue type</td>
            <td>
              <span className="data-tag data-tag-light">{data?.issueType}</span>
            </td>
          </tr>
          <tr>
            <td className="text-muted text-right">Reporter</td>
            <td>
              <span className="data-tag data-tag-light">{data?.reporter}</span>{' '}
              <span title="12/09/2021">15 days ago</span> @
              <br />
              {data?.workflowName}
            </td>
          </tr>
          <tr>
            <td className="text-muted text-right text-nowrap">Last update</td>
            <td title="12/13/2021">10 days ago</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ChattingIssueTable;
