import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, FormControl, InputGroup, Button } from "react-bootstrap";

import Select from "react-select";

import Badge from "../../components/UI/Badge";
import "./users.css";
import moment from "moment";

import "./products.css";
import { Link } from "react-router-dom";
import activityStatusMapping from "../../assets/JsonData/products.json";

const itemsPerPage = 10;

const ManageUsers = () => {
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [filter, setFilter] = useState("");
  const [searchBuffer, setSearchBuffer] = useState("");
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    axios
      .post(
        `${
          process.env.REACT_APP_SERVER_URL
        }/getproducts/${itemsPerPage}/${offset}${
          filter ? "?activityStatus=" + filter.value : ""
        }`,
        { search }
      )
      .then(({ data }) => {
        setProducts(data.products);
        setTotalItems(data.totalProducts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [filter, search, offset]);

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
                placeholder="Search by title"
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
                { value: "removed", label: "Removed" },
                { value: "inactive", label: "Inactive" },
                { value: "traded", label: "Traded" },
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
                  <th>Title</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item, index) => (
                  <tr key={index}>
                    <th>{`${item.title}`}</th>
                    <th>{`${item.owner.username}`}</th>
                    <th>
                      <Badge
                        type={`${activityStatusMapping[item.activityStatus]}`}
                        text={item.activityStatus}
                      />
                    </th>
                    <th>{`${moment(new Date(item.createdAt)).format(
                      "lll"
                    )}`}</th>
                    <th>
                      <div className="action-buttons">
                        <Link to={`/detail/${item._id}`}>
                          {" "}
                          <i className="bx bx-window-open hvr-scale action-icon"></i>
                        </Link>
                      </div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
            {products.length === 0 && (
              <center>
                <p>No Items to Show</p>
              </center>
            )}
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
