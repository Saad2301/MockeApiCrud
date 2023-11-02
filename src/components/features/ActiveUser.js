import React from 'react';
import { Typography, List, Avatar } from 'antd';

const { Title } = Typography;

const ActiveUser = () => {
  const user = JSON.parse(localStorage.getItem("users"));

  const data = [
    { label: 'Name', value: user.name },
    { label: 'Email', value: user.email },
    { label: 'Stack', value: user.stack },
  ];

  return (
    <div>
      <Title level={2}>Active User Detail</Title>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <Avatar src={user.Pic} size={64} style={{ marginRight: '16px' }} />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<span className="label">{item.label}:</span>}
                description={item.value}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ActiveUser;
