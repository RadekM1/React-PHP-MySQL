import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import TextField from "@mui/material/TextField";
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const FilterForm2 = ({ data, handleFilterData, handleReset, handleSpz}) => {

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [toggle, setToggle] = useState('vyrobce');
  const [filteredSPZ, SetFilteredSPZ] = useState("")

  const handleFilter = () => {
    handleFilterData(data.filter(car => selectedBrand.includes(car.brand)))
    
  }

  const handleResetBtn = () => {
    handleReset();
    SetFilteredSPZ("");
    setSelectedBrand([]);
  }

  const handleSpzFilter = () => {
    filteredSPZ.length>7 && alert("SPZ může mít maximálně 7 znaků") ||
    filteredSPZ.length<=7 && handleSpz(filteredSPZ);
    
  }

  const handleToggle = (event, newAlignment) => {
    setToggle(newAlignment);
  };

  const handleSpzVal = (e) => {
    const val = e.target.value
    SetFilteredSPZ(val)
  }

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setSelectedBrand(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    setBrands(Array.from(new Set(data.map((car) => car.brand))));
  }, [data]);

  return (
    <div className='formAtyp'>
      <div className='row'>
        <div className='row d-flex justify-content-center'>
          <div className='col-12 col-sm-6 mt-1'>
            <FormControl sx={{ m: 0, width: 250 }} disabled={toggle !== 'vyrobce'}>
              <InputLabel>{}Výrobce</InputLabel>
              <Select
                id="demo-multiple-checkbox"
                multiple
                value={selectedBrand}
                onChange={handleChange}
                input={<OutlinedInput label="Výrobce" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    <Checkbox checked={selectedBrand.indexOf(brand) > -1} />
                    <ListItemText primary={brand} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='col-12 col-sm-6 mt-1'>
            <TextField   sx={{ m: 0, width: 250 }}
              disabled={toggle !== 'spz'}
              id="reg-filter" 
              name="reg-filter" 
              label="SPZ (0-7 znaků)" 
              value={filteredSPZ}
              variant="outlined" 
              onChange= {handleSpzVal}
            />
          </div>
        </div>
      </div>
        <div className='row d-flex justify-content-center m-3'>
        <ToggleButtonGroup className='justify-content-center d-flex flex-column flex-sm-row'
        color="primary"
        value={toggle}
        exclusive
        onChange={handleToggle}
        aria-label="Platform"
        >
        <ToggleButton className='d-flex col-12 col-sm-6' value="vyrobce">Vyhledat dle výrobce</ToggleButton>
        <ToggleButton className='d-flex col-12 col-sm-6' value="spz">Vyhledat dle SPZ</ToggleButton>
      </ToggleButtonGroup>
      </div>
      <div className='row d-flex m-3'>
        <div className='col-6 justify-content-end d-flex'>
          <Button 
            onClick={()=>toggle==='vyrobce' && handleFilter() || toggle ==='spz' && handleSpzFilter()}
            variant="contained">
            Filtrovat
          </Button>
        </div>
        <div className='col-6 justify-content-start d-flex'>
        <Button 
            onClick={handleResetBtn}
            variant="contained"
            color = "error"
        >
            Reset
        </Button>
        </div>
      </div>
    </div>
  );
}

export default FilterForm2;
