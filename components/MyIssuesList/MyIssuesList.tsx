import React, { FC } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';
import MyIssueItem from '../MyIssueItem/MyIssueItem';
import { MyIssueState } from '../../lib/redux/reducers';

interface Props {
  issues: MyIssueState[],
}

const { SubMenu } = Menu;

const MyIssuesList: FC<Props> = ({ issues }) => {
  return (
    <>
      { issues && issues.map( issue => {
        return (
          <Menu.Item key={issue.id}>
            {/* <Link href="/channel/[channel]" as={`/channel/$issue.title??`}> */}
              <a>
                <MyIssueItem
                  issue = {issue}
                />
              </a>
            {/* </Link> */}
          </Menu.Item>
        )
      })}
    </>
  )
};

export default MyIssuesList;

{/* <SubMenu key="sub2" title="Direct Messages">
          <Menu.Item key="9">Alex</Menu.Item>
          <Menu.Item key="10">Ryan</Menu.Item>
          <Menu.Item key="11">Jibi</Menu.Item>
        </SubMenu> */}