import React, { FC } from 'react';
import IssueItem from '../IssueItem/IssueItem';
import { MyIssueState } from '../../lib/redux/reducers';
import { Issue } from '../../types';

interface Props {
  issues: Issue[],
  channel: string,
}

const IssuesList: FC<Props> = ({ issues, channel }) => {
  return (
    <div>
      {
        issues && issues.map( issue => {
          return(
            <IssueItem
              key = {issue._id}
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
