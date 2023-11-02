import { useDispatch, useSelector } from "react-redux";
import { getAll, removeUser,updateUser } from "../../store/UserSlice";
import { Table, Button, Modal, Select, Radio,Checkbox, Typography,pagination } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import { Fields } from "../../constant/Users";
import apiCaller from "../../services/api/API";
const AllPosts = () => {
  const [userEdit, setUserEdit] = useState(false);
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",

      render: (text, record, index) => index + 1,
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Terms",
      dataIndex: "terms",
      key: "terms",
      render: (terms) => (terms ? "accept" : "declined"),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, index,id) => {
        return (
          <>
            <EditOutlined onClick={() => editUser(record.id)} />
            <DeleteOutlined
              style={{ color: "red", marginLeft: "12px" }}
              onClick={() => deleteUser(record.id)}
            />
          </>
        );
      },
    },
  ];
  
  const dispatch = useDispatch();
  const myUsers = useSelector((state) => state.userDetails.users);
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setEdit({
      ...edit,
      [name]: fieldValue,
    });
  };
 // method={Get:'get',Post:'post'}
  const allposts = async () => {
    try {
      const res = await apiCaller({method: 'get', url:'users'});
      dispatch(getAll(res.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally{
      setLoading(false);
    }
  };
  useEffect(()=>{
    allposts();
  },[])
  const deleteUser = (id) => {
    try {
      Modal.confirm({
        title: "Are you sure you want to delete this record?",
        okText: "yes",
        okType: "danger",
        onOk: async () => {
          console.log(id);
          try {
           await apiCaller({method: 'delete', url:`users/${id}`});
           dispatch(removeUser(id));
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        },
      });
    } catch (error) {
      console.log("Error:", error);
    }
  };
  
  const editUser = (id) => {
    console.log('first id: ', id);
    setUserEdit(true);
    const userToEdit = myUsers.find((user) => user.id === id);
    setEdit(userToEdit);
  };
  
  const saveEditUser = async (id) => {
    console.log('id is:', id);
    try {
      const res = await apiCaller({method: 'put', url:`users/${id}`,data:edit});
      dispatch(updateUser(res.data));
      setUserEdit(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  return (
    <div>
      {
        loading ?(
        <Typography.Title>Loading...</Typography.Title>
        ):(
          <div>
      <Typography.Title style={{textAlign:'center'}}>All_Posts Details</Typography.Title>
      <Table className="table" dataSource={myUsers} columns={columns} />
      <Modal
        title="Are you want to edit a record"
        open={userEdit}
        okText="save"
        onCancel={() => {
          setUserEdit(false);
        }}
       onOk={()=>saveEditUser(edit.id)}
      >
        {Fields.map((field) => {
          if (
            field.type === "text" ||
            field.type === "email" ||
            field.type === "tel"
          ) {
            return (
              <Input
                type={field.type}
                placeholder={field.placeholder}
                name={field.name}
                value={edit ? edit[field.name] : ""}
                onChange={handleChange}
              />
            );
          } 
          else if(field.type==='Select'){
            return(
              <Select
                    type={field.type}
                    name={field.name}
                    value={edit? edit[field.name]:''}
                    onChange={(value) => handleChange({ 
                      target: { name: field.name, value } })}
                 
                  >
                    {field.Option.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
            )
          }
          else if (field.type === 'Radio') {
            return (
                <Radio.Group
                  type={field.type}
                  name={field.name}
                  value={edit? edit[field.name]:''}
                  onChange={handleChange}
                >
                  {
                    field.Option.map((option) => (
                      <Radio key={option.value} value={option.value}>
                        {option.label}
                      </Radio>
                    ))
                  }
                </Radio.Group>
            )
          }
        })}
      </Modal>
    </div>
        )
      }
    </div>
  );
};
export default AllPosts;
