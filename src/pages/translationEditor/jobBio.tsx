import React from 'react';

interface Props {
  sourceFile: any;
  targetFile: any;
  jobIdComponent: any;
}

const JobBio = ({sourceFile, targetFile, jobIdComponent}: Props) => {
  return (
    <div className="content-preview-padding">
      <div className="row content-preview mb-2">
        <div className="col-6">
          <div className="rtui-tred-stp-source rtui-block-el-id-title1">
            <span className="rtui-ial-class-smcaps rtui-ial-class-italic">{sourceFile['id-page']['title1']}</span>
          </div>
        </div>
        <div className="col-6">
          <div className="rtui-tred-stp-target rtui-block-el-id-title1">
            <span className="rtui-ial-class-smcaps rtui-ial-class-italic">
              &lt;{targetFile['id-page']['title1']}&gt;
            </span>
            <span> {jobIdComponent}</span>
          </div>
        </div>
      </div>
      <div className="row content-preview mb-2">
        <div className="col-6">
          <div className="rtui-tred-stp-source rtui-block-el-id-title2">{sourceFile['id-page']['title2']}</div>
        </div>
        <div className="col-6">
          <div className="rtui-tred-stp-target rtui-block-el-id-title2">({targetFile['id-page']['title2']})</div>
        </div>
      </div>
      <div className="row content-preview mb-2">
        <div className="col-6">
          <div className="rtui-tred-stp-source rtui-block-el-id-title2">
            {sourceFile['id-page']['paragraph-part-1']}
          </div>
        </div>
        <div className="col-6">
          <div className="rtui-tred-stp-target rtui-block-el-id-title2">
            {targetFile['id-page']['paragraph-part-1']}
          </div>
        </div>
      </div>

      <div className="row content-preview mb-2">
        <div className="col-6">
          <div className="rtui-tred-stp-source rtui-block-el-id-title2">
            {sourceFile['id-page']['paragraph-part-2']}
          </div>
        </div>
        <div className="col-6">
          <div className="rtui-tred-stp-target rtui-block-el-id-title2">
            <textarea dir="auto" className="form form-control" style={{height: '4rem'}} spellCheck="false"></textarea>
          </div>
        </div>
      </div>
      <div className="row content-preview mb-2">
        <div className="col-6">
          <div className="rtui-tred-stp-source rtui-block-el-id-title2">
            {sourceFile['id-page']['paragraph-part-3']}
          </div>
        </div>
        <div className="col-6">
          <div className="rtui-tred-stp-target rtui-block-el-id-title2">
            {targetFile['id-page']['paragraph-part-3']}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBio;
