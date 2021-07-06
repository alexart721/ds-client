import { FC } from 'react';
import { MyIssueState } from '../../lib/redux/reducers';

interface Props {
  issue: MyIssueState,
}

const MyIssueItem: FC<Props> = ({ issue }) => (
  <>
    <div>
      <label htmlFor="issue"># { /* this needs issue.title? */ }</label>
    </div>
  </>
);

export default MyIssueItem;
