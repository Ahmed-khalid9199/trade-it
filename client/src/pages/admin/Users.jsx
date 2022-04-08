import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, FormControl, InputGroup, Button } from "react-bootstrap";

import Select from "react-select";

import Badge from "../../components/UI/Badge";
import "./users.css";
import moment from "moment";
import { useSelector } from "react-redux";
const itemsPerPage = 20;

const ManageUsers = () => {
  const user = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchBuffer, setSearchBuffer] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    axios
      .post(
        `${
          process.env.REACT_APP_SERVER_URL
        }/getusers/${itemsPerPage}/${offset}${
          filter ? "?status=" + filter.value : ""
        }`,
        { search }
      )
      .then(({ data }) => {
        const { users, totalUsers } = data;
        // data = data.filter((u) => u.username !== user.username);
        setUsers(users);
        setTotalItems(totalUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter, search, offset]);

  const changeStatus = async (user) => {
    const newStatus = user.status === "deactivated" ? "active" : "deactivated";
    const result = await axios.put(
      `${process.env.REACT_APP_SERVER_URL}/updateuser/${user._id}`,
      { status: newStatus }
    );
    const newUser = result.data;
    setUsers((prev) =>
      prev.map((item) => (item._id === user._id ? newUser : item))
    );
  };

  useEffect(() => {
    const indentifier = setTimeout(async () => {
      if (searchBuffer.length > 2 || !searchBuffer) {
        setSearch(searchBuffer);
      }
    }, 500);
    return () => {
      clearTimeout(indentifier);
    };
  }, [searchBuffer]);
  const handlePageChange = (event) => {
    let newOffset = 0;
    if (event === "prev" && offset >= itemsPerPage) {
      newOffset = offset - itemsPerPage;
    } else if (event === "next" && offset + itemsPerPage < totalItems) {
      newOffset = offset + itemsPerPage;
    } else {
      return;
    }

    setOffset(newOffset);
  };
  return (
    <>
      {/* Begin Page Content */}
      <div className="container-fluid">
        {/* Page Heading */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="cont-hed">Manage Users</h1>
        </div>
        <Row>
          <Col xs lg="4">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search by name or email"
                aria-label="Search by name or email"
                aria-describedby="basic-addon2"
                onChange={(e) => {
                  setSearchBuffer(e.target.value);
                }}
              />
            </InputGroup>
          </Col>
          <Col xs lg="4">
            <Select
              value={filter}
              onChange={(currFilter) => {
                setFilter(currFilter);
              }}
              options={[
                { value: "active", label: "Active" },
                { value: "deactivated", label: "Deactivated" },
              ]}
              isClearable={true}
            />
          </Col>
        </Row>
        <div className="cont-des">
          <div className="table-responsive">
            <table className="table table-not" id="dataTable" width="100%">
              <thead>
                <tr>
                  <th>Username</th>
                  {/* <th>Name</th> */}
                  <th>Email</th>
                  {/* <th>Phone#</th> */}
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {users.map((item, index) => (
                  <tr key={index}>
                    <th>{`${item.username}`}</th>
                    {/* <th>{`${item.firstName} ${item.lastName}`}</th> */}
                    <th>{`${item.email}`}</th>
                    {/* <th>{`${item.phoneNumber}`}</th> */}
                    <th>
                      <Badge
                        type={`${
                          item.status === "active" ? "bg-success" : "bg-danger"
                        }`}
                        text={item.status}
                      />
                    </th>
                    <th>{`${moment(new Date(item.createdAt)).format(
                      "lll"
                    )}`}</th>
                    <th>
                      <button
                        className={`badge bx-shadow hvr-scale ${
                          item.status === "active" ? "bg-danger" : "bg-success"
                        }`}
                        onClick={() => {
                          changeStatus(item);
                        }}
                      >
                        {item.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            {itemsPerPage < totalItems && (
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => handlePageChange("prev")}
                  disabled={offset < itemsPerPage}
                >
                  {"<"}
                </Button>
                <Button
                  onClick={() => handlePageChange("next")}
                  disabled={offset + itemsPerPage >= totalItems}
                >
                  {">"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* /.container-fluid */}
    </>
  );
};

export default ManageUsers;
