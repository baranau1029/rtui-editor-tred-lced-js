import Checkbox from 'components/checkbox';
import {EditorMode} from 'components/editor/editorRow';
import {
  handleFilterCaption,
  handleInvalidCaption,
  handleOpenOrResolvedCaption,
  handlePendingCaption,
} from 'helper/jumpCaptions';
import React, {forwardRef, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {ISelectedCaption} from 'types';

interface CaptionTypeOptionsProps {
  editMode: EditorMode;
  jobData: any;
  selectedCaption: ISelectedCaption;
  translationId: string;
  setTop: () => void;
  setBottom: () => void;
}

const CaptionTypeOptions = forwardRef(
  ({editMode, jobData, selectedCaption, translationId, setTop, setBottom}: CaptionTypeOptionsProps, ref: any) => {
    const dispatch = useDispatch();
    const [topOrBottomClicked, setTopOrBottomClicked] = useState(false);
    useEffect(() => {
      const element: HTMLDivElement = ref.current;
      const handleOnScroll = (e: any) => {
        if (e.target.scrollTop === 0 && topOrBottomClicked) {
          setTop();
          setTopOrBottomClicked(false);
        }
        if (element.scrollHeight - element.scrollTop === element.clientHeight && topOrBottomClicked) {
          setBottom();
          setTopOrBottomClicked(false);
        }
      };
      element.addEventListener('scroll', handleOnScroll);
      return () => {
        element.removeEventListener('scroll', handleOnScroll);
      };
    }, [topOrBottomClicked, ref, setBottom, setTop]);
    const HandleScrollTop = () => {
      ref.current.scroll({
        top: 0,
        behavior: 'smooth',
      });
      setTopOrBottomClicked(true);
    };

    const HandleScrollBottom = () => {
      ref.current.scroll({
        top: ref.current.scrollHeight,
        behavior: 'smooth',
      });
      setTopOrBottomClicked(true);
    };

    const handlePending = () => {
      handlePendingCaption(jobData, selectedCaption, dispatch);
    };

    const handleInvalid = () => {
      handleInvalidCaption(jobData, selectedCaption, dispatch);
    };

    const handleFilter = () => {
      handleFilterCaption(jobData, selectedCaption, dispatch);
    };

    const handleOpen = () => {
      handleOpenOrResolvedCaption(jobData, selectedCaption, dispatch, 'open');
    };

    const handleResolve = () => {
      handleOpenOrResolvedCaption(jobData, selectedCaption, dispatch, 'to be resolved');
    };

    return (
      <table className="table table-sm table-borderless mb-3">
        <tbody>
          <tr>
            <td className="pr-1" style={{whiteSpace: 'nowrap'}}>
              Jump to caption
            </td>
            <td>
              <div role="group" className="btn-group mr-1">
                <button className="btn btn-light btn-sm" onClick={handlePending}>
                  Pending
                </button>
                <button className="btn btn-light btn-sm" onClick={handleInvalid}>
                  Invalid
                </button>
                <button className="btn btn-light btn-sm" onClick={HandleScrollTop}>
                  Top
                </button>
                <button className="btn btn-light btn-sm" onClick={HandleScrollBottom}>
                  Bottom
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Jump to issue</td>
            <td>
              <div role="group" className="btn-group">
                <button className="btn btn-light btn-sm" onClick={handleFilter}>
                  Filtered
                </button>
                <button className="btn btn-light btn-sm" onClick={handleOpen}>
                  Open
                </button>
                <button className="btn btn-light btn-sm" onClick={handleResolve}>
                  To be resolved
                </button>
              </div>
            </td>
          </tr>
          <tr>
            <td>Filter issues</td>
            <td>
              <div>
                <span>By workspace: </span>
                <Checkbox id="filter_issues_by_workspace_TR" label="TR" onClick={() => {}} />
                <Checkbox id="filter_issues_by_workspace_FE" label="FE" onClick={() => {}} />
                <Checkbox id="filter_issues_by_workspace_LC" label="LC" onClick={() => {}} />
                <br />
                <span>By Resolution: </span>
                <Checkbox id="filter_issues_by_resolution_fixed" label="Fixed" onClick={() => {}} />
                <Checkbox id="filter_issues_by_resolution_stet" label="Stet" onClick={() => {}} />
                <Checkbox id="filter_issues_by_resolution_unresolved" label="unresolved" onClick={() => {}} />
              </div>
            </td>
          </tr>
          {editMode === EditorMode.review && (
            <tr>
              <td>Export</td>
              <td>
                <a
                  href={`https://omega.branham.org/translation/translation_jobs/${translationId}/export_source_pdf.pdf`}
                  className="btn btn-light btn-sm mr-1 mb-1">
                  ENG PDF
                </a>
                <a
                  href={`https://omega.branham.org/translation/translation_jobs/${translationId}/export_target_pdf.pdf`}
                  className="btn btn-light btn-sm mr-1 mb-1">
                  BUL PDF
                </a>
                <a
                  href={`https://omega.branham.org/translation/translation_jobs/${translationId}/export_target_docx.docx`}
                  className="btn btn-light btn-sm">
                  BUL DOCX
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  },
);

export default CaptionTypeOptions;
