import { useEffect, useState } from "react";
import "./MainPage.css";
import LoadingScreen from "./LoadingScreen";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import Typography from "@mui/joy/Typography";
import { Box, Modal } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function MainPage() {
  const [openEdit, setOpenEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [todoArray, setToDoArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [todo, setToDo] = useState({});
  useEffect(() => {
    setLoading(true);
    getToDo();
  }, []);
  //Get ToDo Array from api
  const getToDo = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setToDoArray(json);
        setLoading(false);
      });
  };

  //create new todo Array
  const createToDo = (event) => {
    var formData = new FormData(event.target);
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        body: formData.get("description"),
        userId: formData.get("userId"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setToDoArray((prev) => [...prev, json]);
        setLoading(false);
        setOpen(false);
      });
  };

  //Delete Todo 
  const deleteToDo = (index) => {
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/posts/${index}`, {
      method: "DELETE",
    }).then((response) => {
      setToDoArray((prevArray) =>
        prevArray.filter((item, i) => item.id !== index)
      );
      setLoading(false);
    });
  };
  //updating todo
  const updateToDo = (event) => {
    setLoading(true);
    var formData = new FormData(event.target);
    fetch(`https://jsonplaceholder.typicode.com/posts/${todo.id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: todo.id,
        title: formData.get("title"),
        body: formData.get("description"),
        userId: formData.get("userId"),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setLoading(false);
        setToDoArray((prevArray) =>
          prevArray.map((item) => {
            if (item.id === todo.id) {
              return { ...item, ...json };
            }
            return item;
          })
        );
        setOpenEdit(false);
      });
  };
  return (
    <div className="App">
      <div className="container">
        <div className="headingDiv">
          <h1>ToDo List</h1>{" "}
          <Button
            variant="outlined"
            color="neutral"
            startDecorator={<Add />}
            onClick={() => setOpen(true)}
          >
            New Todo
          </Button>
        </div>
        <table className="rwd-table">
          <tbody>
            <tr>
              <th>Sno</th>
              <th>User Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
            {todoArray.map((data, index) => {
              return (
                <tr key={index}>
                  <td data-th="Sno">{index + 1}</td>
                  <td data-th="User Id">{data.userId}</td>
                  <td data-th="Title">{data.title}</td>
                  <td data-th="Completed">{data.body}</td>
                  <td data-th="Action">
                    <button
                      onClick={() => {
                        setToDo(todoArray[index]);
                        setOpenEdit(true);
                      }}
                      className="button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteToDo(data.id);
                      }}
                      className="buttonRed"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <LoadingScreen open={loading} />
      <Modal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="basic-modal-dialog-title" component="h2">
            Update ToDo List
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Fill in the information of the ToDo.
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setLoading(true);
              updateToDo(event);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>User Id</FormLabel>
                <Input
                  defaultValue={todo.userId}
                  name="userId"
                  type="number"
                  autoFocus
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  defaultValue={todo.title}
                  name="title"
                  type="text"
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  defaultValue={todo.body}
                  multiline
                  name="description"
                  type="text"
                  required
                />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="basic-modal-dialog-title" component="h2">
            Create new ToDo List
          </Typography>
          <Typography
            id="basic-modal-dialog-description"
            textColor="text.tertiary"
          >
            Fill in the information of the ToDo.
          </Typography>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setLoading(true);
              createToDo(event);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>User Id</FormLabel>
                <Input name="userId" type="number" autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input name="title" type="text" required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input multiline name="description" type="text" required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default MainPage;
