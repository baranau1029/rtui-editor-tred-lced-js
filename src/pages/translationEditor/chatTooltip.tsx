import React from 'react';
import ReactTooltip from 'react-tooltip';

interface ChatTooltipProps {
  id: string;
}

const ChatTooltip = ({id}: ChatTooltipProps) => {
  return (
    <ReactTooltip clickable delayShow={200} delayHide={200} place="top" type="dark" effect="solid" id={id}>
      <div className="issuesWrapper">
        <p>
          #208421 To demonstrate <br /> issues
        </p>
      </div>
    </ReactTooltip>
  );
};

export default ChatTooltip;
