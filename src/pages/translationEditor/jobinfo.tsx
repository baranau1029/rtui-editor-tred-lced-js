import React from 'react';

interface JobinfoProps {
  jobId: string;
  targetLang: string;
  completed: number;
  pending: number;
  invalid: number;
  open: number;
  closed: number | string;
  sourceWordsCount: number;
  lastSync: string;
  gitCommitId: string;
  jobStepName: string;
  status: string;
}

const Jobinfo = ({
  jobId,
  targetLang,
  completed,
  pending,
  invalid,
  open,
  closed,
  sourceWordsCount,
  lastSync,
  gitCommitId,
  jobStepName,
  status,
}: JobinfoProps) => {
  return (
    <div className="row justify-content-md-center">
      <div className="col-4 text-end">Sermon</div>
      <div className="col-7">{jobId}</div>
      <div className="w-100" />
      <div className="col-4 text-end">Target language</div>
      <div className="col-7">{targetLang}</div>
      <div className="w-100" />
      <div className="col-4 text-end">Caption stats</div>
      <div className="col-7">
        <span className="badge mr-1 badge-light" title="Pending">
          {pending}
        </span>
        <span className="badge mr-1 badge-success" title="Completed">
          {completed}
        </span>
        <span className="badge mr-1 badge-warning" title="With ignored validation errors" />
        <span className="badge mr-1 badge-danger" title="Invalid">
          {invalid}
        </span>
      </div>
      <div className="col-4 text-end">Issue stats</div>
      <div className="col-7">
        <span className="badge mr-1 badge-light" title="Closed">
          {closed}
        </span>
        <span className="badge mr-1 badge-warning" title="Open">
          {open}
        </span>
      </div>
      <div className="w-100" />
      <div className="col-4 text-end text-nowrap">Source word count</div>
      <div className="col-7">{sourceWordsCount}</div>
      <div className="w-100" />
      <div className="col-4 text-end">Last sync</div>
      <div className="col-7">
        <span title="Today at 12:15 PM">{lastSync}</span>
      </div>
      <div className="w-100" />
      <div className="col-4 text-end">Source git commit</div>
      <div className="col-7">{gitCommitId}</div>
      <h4 className="mt-3">Workflow based job</h4>
      <div className="w-100" />
      <div className="col-4 text-end">Master job step</div>
      <div className="col-7">{jobStepName}</div>
      <div className="w-100" />
      <div className="col-4 text-end">Status</div>
      <div className="col-7">{status}</div>
      <div className="col-12">
        <div className="alert alert-info mt-3">
          <h5 className="alert-heading">Job completion</h5>
          <p className="mb-0">This job cannot be completed yet. Please address the blockers below:</p>
          <ul className="mb-0">
            {!!invalid && <li>There are invalid captions.</li>}
            {!!pending && <li>There are pending captions.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Jobinfo;
