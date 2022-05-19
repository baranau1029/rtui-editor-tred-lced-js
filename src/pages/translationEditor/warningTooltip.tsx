import ValidationWarnings from 'components/validationWarnings';
import React from 'react';
import {useSelector} from 'react-redux';
import ReactTooltip from 'react-tooltip';
import {validationSelector} from 'redux/selector';
import {v4 as uuidv4} from 'uuid';

interface WarningTooltipProps {
  id: string;
}

const WarningTooltip = ({id}: WarningTooltipProps) => {
  const validations = useSelector((state: any) => validationSelector(state));

  const getWarningsMessages = () => {
    if (validations?.repositext) {
      return validations.repositext.warnings;
    }
    return [];
  };

  return (
    <ReactTooltip clickable delayShow={200} delayHide={200} place="right" type="light" effect="solid" id={id}>
      <div className="tooltip-wrapper">
        <div className="arrow-left"></div>
        <div className="tooltip-card">
          <ValidationWarnings externalClass="warning-card custom-warnings">
            <ul>
              {getWarningsMessages().map((war: string) => (
                <li key={uuidv4()} dangerouslySetInnerHTML={{__html: war}}></li>
              ))}
            </ul>
          </ValidationWarnings>
        </div>
      </div>
    </ReactTooltip>
  );
};

export default WarningTooltip;
