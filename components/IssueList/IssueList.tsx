import React, { FC } from 'react';
import IssueItem from '../IssueItem/IssueItem';
import { Issue } from '../../lib/types';

interface Props {
  issues: Issue[],
  channel: string,
}

const IssuesList: FC<Props> = ({ issues, channel }) => (
  <div>
    {
        issues && issues.map((issue) => (
          <IssueItem
            key={issue._id}
            issue={issue}
            channel={channel}
          />
        ))
      }
  </div>

);

export default IssuesList;
