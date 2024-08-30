import "./UpdateForm";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

const UpdateForm = ({ data, handleData, id, handleUpdate }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    const temp = { ...data, [name]: value };
    handleData(temp, id);
  };

  return (
    <>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100ch' },
          display: "flex",
          justifyContent: "center",
        }}
        noValidate
        autoComplete="off"
      >
        <div className="d-flex justify-content-center align-content-center ">
          <div className="d-flex flex-wrap" id="pole">
            <TextField
              label="Značka"
              className="m-1 col-12 col-sm-2"
              onChange={handleChange}
              name="brand"
              value={data.brand}
              size="small"
              variant="outlined"
            />
            <TextField
              label="Model"
              className="m-1 col-12 col-sm-2"
              onChange={handleChange}
              name="model"
              value={data.model}
              size="small"
              variant="outlined"
            />
            <TextField
              label="SPZ"
              className="m-1 col-12 col-sm-2"
              onChange={handleChange}
              name="reg"
              value={data.reg}
              size="small"
              variant="outlined"
            />
            <TextField
              label="Najeto"
              className="m-1 col-12 col-sm-2"
              onChange={handleChange}
              name="km"
              value={data.km}
              size="small"
              variant="outlined"
            />
            <TextField
              label="Rok"
              className="m-1 col-12 col-sm-2 plr"
              onChange={handleChange}
              name="year"
              value={data.year}
              size="small"
              variant="outlined"
            />
            <div className="sirka m-1 align-self-center col-1">
              <Button
                onClick={() => handleUpdate(id)}
                variant="contained"
                endIcon={<SendIcon />}
              >
                Odeslat
              </Button>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default UpdateForm;
