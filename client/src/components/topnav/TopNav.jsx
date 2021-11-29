import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import logo from "../../assets/images/olx-logo1.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import MySelect from "../UI/MySelect";
import { InputGroup, Row } from "react-bootstrap";
import Modal from "../modals/MyModal";
import "../../app.css";
import "./topnav.css";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

// const classes = useStyles();
class Navbar extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    Modal.defaultStyles = {};
    return (
      <>
        <div>
          <AppBar>
            <Toolbar position="static" className="my-navbar">
              <Link to="/">
                <IconButton
                  edge="start"
                  className="menuButton"
                  color="inherit"
                  aria-label="menu"
                >
                  <img src={logo} width="68px" height="48px" alt="olx-logo" />
                </IconButton>
              </Link>
              <MySelect
                placeholder="my location"
                isMulti={false}
                options={[
                  { label: "Karachi ", value: "karachi" },
                  { label: "Lahore ", value: "lahore" },
                  { label: "Islamabad ", value: "islamabad" },
                ]}
              />
              <div>
                <i class="bx bx-search"></i>
                <Form.Control
                  size="md"
                  type="email"
                  placeholder="Search anything"
                  className="top-search"
                />
              </div>
              <div className="my-navbar">
                <div>
                  <li href="/" id="link" onClick={this.handleOpenModal}>
                    <Button variant="primary">Log in</Button>
                  </li>
                </div>
                <div>
                  <Link to="./post">
                    <span>
                      <Button variant="outline-success">
                        +Post New Product
                      </Button>
                    </span>
                  </Link>
                </div>
              </div>
              {/* <Modal
                isOpen={this.state.showModal}
                contentLabel="Minimal Modal Example"
                className="login"
              >
                <div>
                  <div onClick={this.handleCloseModal} className="close">
                    &#10006;
                  </div>
                  <img src="https://i.imgur.com/2dywpzc.png" />
                </div>
              </Modal> */}
              <Modal
                show={this.state.showModal}
                heading="Reject Carrier"
                onConfirm={this.handleCloseModal}
                onClose={this.handleCloseModal}
              ></Modal>
            </Toolbar>
          </AppBar>
        </div>
      </>
    );
  }
}
class Mininav extends React.Component {
  render() {
    return (
      <div
        position="relative"
        style={{
          backgroundColor: "white",
          display: "flex",
          padding: "10px 30px",
          marginTop: "75px",
          boxShadow: "0px 1px 7px 0px silver",
          zIndex: "1",
        }}
      >
        <input type="button" value="ALL CATEGORIES" id="megaMenu" />
        <li id="link">Mobile Phones</li>
        <li id="link">Cars</li>
        <li id="link">Motorcycle</li>
        <li id="link">Houses</li>
        <li id="link">TV-Video-Audio</li>
        <li id="link">Tablets</li>
        <li id="link">Land & Plots</li>
      </div>
    );
  }
}

// function smlinks(){
//   return(
//   );
// }

export { Navbar, Mininav };
