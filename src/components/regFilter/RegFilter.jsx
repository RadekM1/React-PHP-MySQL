import "./RegFilter.css"
import TextField from "@mui/material/TextField";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const RegFilter = () => {


    return (
    <div className='formAtyp'>
        <div className="row">
        <h5 className="h5">Filtrovat dle SPZ</h5>    
        </div>
        <div className='row d-flex justify-content-center'>
        <Box
            component="form"
            sx={{ '& > :not(style)': { mt: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
        >
        <TextField id="reg-filter" name="reg-filter" label="Vyplňte část SPZ" variant="outlined" />
        <div className='row d-flex'>
            <div className='col-12 justify-content-end d-flex'>
            <Button 
                onClick={() => handleFilterReg(data.filter(car => selectedBrand.includes(car.brand)))} 
                variant="contained">
                Filtrovat
            </Button>
        </div>
    </div>



        </Box>
        </div>
    </div>



    )

}


export default RegFilter;