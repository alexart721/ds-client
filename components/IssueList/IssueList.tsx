import React, { FC } from 'react';
import IssueItem from '../IssueItem/IssueItem';
import { ChannelState, IssueState } from '../../lib/redux/reducers';

interface Props {
  issues: IssueState[],
  channel: string,
}

const IssuesList: FC<Props> = ({ issues, channel }) => {
  return (
    <div>
      {
        issues && issues.map( issue => {
          return(
            <IssueItem 
              key = {issue.id}
              issue = {issue}
              channel= {channel}
            />
          )
        })
      }
    </div>
    
  )
};

export default IssuesList;
