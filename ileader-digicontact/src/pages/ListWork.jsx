import React from "react";
import { Page, Text, useNavigate, List, Icon, Avatar } from "zmp-ui";
import "../css/listWork.css";

const ListWork = ({ tasks }) => {
  const navigate = useNavigate();

  // Dữ liệu mẫu
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const users = Array.from(Array(10).keys()).map((i) => ({
    name: `Học sinh ${i}`,
    avatar: alphabet[Math.floor(Math.random() * alphabet.length)].toUpperCase(),
    online: Math.floor(Math.random() * 10) % 2 === 0,
    key: i,
  }));


  return (
    <Page className="section-container">
      <Text.Title style={{ textAlign: "center", marginBottom: "20px" }}>
        Danh sách học viên trường SLK
      </Text.Title>

        <a href="" className="user_scholl">
          <List >
            {users.map((user) => (
              <List.Item
                key={user.key}
                prefix={<Avatar online={user.online}>{user.avatar}</Avatar>}
                title={user.name}
                subTitle="Lớp AV.2"
                suffix={<Icon icon="zi-user" />}
              />
            ))}
          </List>
        </a>

    </Page>
  );
};

export default ListWork;
