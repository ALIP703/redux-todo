import React, { ChangeEvent } from "react";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { Grid } from "@mui/material";
import { RootState } from "../../redux/store";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateList, updatedItem } from "../../redux/list";
import "./List.css";

function List() {
  const { itemList } = useSelector((state: RootState) => state.list);
  const [openEditModel, setOpenEditModel] = React.useState(false);
  const [indexOfItem, setIndexOfItem] = React.useState(0);
  const [newItem, setNewItem] = React.useState({
    name: "",
  });
  const dispatch = useDispatch();

  const handleDelete = (index: number) => {
    dispatch(deleteItem(index));
  };

  const handleClose = () => {
    setOpenEditModel(false);
  };

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewItem({ name: event.target.value });
  };

  const handleUpdate = (
    newItem: updatedItem,
    setOpenEditModel: {
      (value: React.SetStateAction<boolean>): void;
      (arg0: boolean): void;
    }
  ) => {
    dispatch(updateList(newItem));
    setOpenEditModel(false);
  };

  const handleOpen = (index: number) => {
    setOpenEditModel(true);
    setIndexOfItem(index);
    setNewItem(itemList[index])
  };
  return (
    <div>
      <ul className="list">
        {itemList.map((item, index) => (
          <li className="list-item" key={index}>
            <Grid container spacing={2} sx={{ marginTop: "1rem" }}>
              <Grid item xs={8}>
                {item.name}
              </Grid>
              <Grid item xs={2}>
                <div
                  onClick={() => {
                    handleOpen(index);
                  }}
                >
                  <CreateIcon sx={{ cursor: "pointer" }} />
                </div>
              </Grid>
              <Grid item xs={2}>
                <div
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  <DeleteIcon sx={{ cursor: "pointer" }} />
                </div>
              </Grid>
            </Grid>
          </li>
        ))}
      </ul>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEditModel}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openEditModel}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              // border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <h1 style={{ color: "black" }}>Update Item</h1>
            <TextField
              id="outlined-basic"
              label="enter item"
              variant="outlined"
              sx={{ width: "100%" }}
              name="name"
              value={newItem.name}
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <Grid container style={{ marginTop: ".5rem" }}>
              <Button
                onClick={() => {
                  const item = { index: indexOfItem, name: newItem.name };
                  handleUpdate(item, setOpenEditModel);
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
    </div>
  );
}

export default List;
