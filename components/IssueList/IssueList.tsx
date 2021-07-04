import React, { FC } from 'react';
import IssueItem from '../IssueItem/IssueItem';
import { MyIssueState } from '../../lib/redux/reducers';

interface Props {
  issues: MyIssueState[],
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
