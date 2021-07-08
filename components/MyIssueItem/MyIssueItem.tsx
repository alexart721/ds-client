import { FC } from 'react';
import { MyIssueState } from '../../lib/types';

interface Props {
  issue: MyIssueState,
}

const MyIssueItem: FC<Props> = ({ issue }) => (
  <>
    <div>
      <label htmlFor="issue">{issue.title}</label>
    </div>
  </>
);

export default MyIssueItem;
