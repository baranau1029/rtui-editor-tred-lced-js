import React from 'react';
import {classesTypes} from 'components/editor/rowTools';
import {useSelector} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import {otherValidationSelector, validationSelector} from 'redux/selector';
import {Validations} from 'services/api.interfaces';
import {v4 as uuidv4} from 'uuid';
import {EditorMode} from 'components/editor/subtitlePairs';
import {msToHour} from 'helper/time';

interface TooltipProps {
  id: string;
  editorMode: EditorMode;
  audioPlayedFrom: any;
}

const TooltipError = ({id, editorMode, audioPlayedFrom}: TooltipProps): JSX.Element => {
  const validations: Validations | null = useSelector((state: any) => validationSelector(state));
  const otherValidations: classesTypes | null = useSelector((state: any) => otherValidationSelector(state));

  return (
    <ReactTooltip delayShow={200} delayHide={200} place="right" type="light" effect="solid" id={id}>
      <div className="tooltip-wrapper">
        <div className="arrow-left"></div>
        <div className="tooltip-card">
          <>
            {editorMode === EditorMode.edit ? (
              <>
                <p className="bage-title">
                  {otherValidations?.eleType && (
                    <span className="badge-pill badge badge-light text-uppercase">{otherValidations?.eleType}</span>
                  )}
                  {otherValidations?.classes && (
                    <>
                      {otherValidations.classes.map((name: string) => (
                        <span key={uuidv4()} className="badge-pill badge badge-light">
                          {name}
                        </span>
                      ))}
                    </>
                  )}
                </p>

                {!!validations?.['block-boundaries'].source && (
                  <p className="mt-1 text-success">Paragraph breaks {validations['block-boundaries'].source}</p>
                )}

                {!!validations?.['eagles'].source && (
                  <p className="mt-1 text-danger">
                    Eagles {validations['eagles'].target}/{validations['eagles'].source}
                  </p>
                )}

                {!!validations?.['formattings'].source.length && (
                  <p className="mt-1 text-danger">Formattings: {validations['formattings'].source.join(' ')}</p>
                )}
                {!!validations?.['formattings'].target.length && (
                  <p className="mt-1 text-success">Formattings: {validations['formattings'].target.join(' ')}</p>
                )}

                {!!validations?.['gap-marks'].source && (
                  <p className="mt-1 text-danger">
                    Gap marks {validations['gap-marks'].target}/{validations['gap-marks'].source}
                  </p>
                )}
                {!!validations?.['paragraph-numbers'].source.length && (
                  <p className="mt-1 text-danger">Paragraph numbers #{validations['paragraph-numbers'].source}</p>
                )}
                <p className="mt-1 bage-title">
                  Status
                  <span className="badge-pill badge badge-light">{otherValidations?.status}</span>
                </p>
                <p className="mt-1 bage-title">
                  Audio Start
                  <span className="badge-pill badge badge-light">
                    {msToHour(audioPlayedFrom['duration-msec'] + audioPlayedFrom['start-msec'])}
                  </span>
                </p>
              </>
            ) : (
              'Invalid'
            )}
          </>
        </div>
      </div>
    </ReactTooltip>
  );
};

export default TooltipError;
