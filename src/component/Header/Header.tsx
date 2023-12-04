import React, { ChangeEvent } from "react";
import { Grid } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { addToList, listItem } from "../../redux/list";
import "./Header.css";

function Header() {
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState({
    name: "",
  });
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setItem({ name: "" });
  };

  const handleAddItem = (
    item: listItem,
    setOpen: {
      (value: React.SetStateAction<boolean>): void;
      (arg0: boolean): void;
    }
  ) => {
    dispatch(addToList(item));
    setOpen(false);
    setItem({ name: "" });
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setItem({ name: event.target.value });
  };
  return (
    <header>
      <Grid container spacing={2} className="header-container">
        <Grid item xs={6}>
          <span> TODO </span>
        </Grid>
        <Grid item xs={1}>
          <AddCircleOutlineIcon
            sx={{
              fontSize: "20px",
              marginTop: ".15rem",
              cursor: "pointer",
              textShadow: "revert",
            }}
            onClick={handleOpen}
          />
        </Grid>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "blue",
                borderRadius:3,
                boxShadow: 24,
                p: 4,
              }}
            >
              <h1 style={{ color: "#F9E4DF" }}>Add Item</h1>
              <TextField
                id="outlined-basic"
                label="enter item"
                variant="outlined"
                sx={{ width: "100%",color:'white' }}
                color="primary"
                name="name"
                value={item.name}
                onChange={(event) => {
                  handleChange(event);
                }}
              />
              <Grid container style={{ marginTop: ".5rem" }}>
                <Button
                  onClick={() => {
                    handleAddItem(item, setOpen);
                  }}
                  variant="outlined"
                >
                  Submit
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{ marginLeft: ".5rem" }}
                >
                  Close
                </Button>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </Grid>
    </header>
  );
}

export default Header;
