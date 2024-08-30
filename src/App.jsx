import "./App.css";
import { useEffect, useState } from "react";
import FilterForm from "./components/filterForm/FilterForm";
import CarList from "./components/carList/CarList";
import UpdateForm from "./components/updateForm/UpdateForm";
import axios from "axios";


function App() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });
  const [carToChange, setCarToChange] = useState({
    id: 0,
    brand: "",
    model: "",
    reg: "",
    km: "",
    year: "",
  });
  const [carsToShow, setCarsToShow] = useState([]);

  //********************* GET *****************************************
  useEffect(() => {
    getCars();
  }, []);
  
  const getCars = () => {
    axios.get('https://radekmorong.cz/projects/react-php-mysql/backend/?action=getAll').then((response) => {
      if (Array.isArray(response.data)) {
        setCars(response.data);
        setCarsToShow(response.data);
      } else {
        console.error("Odpověď serveru není pole.");
        console.log(response.data);
      }
    }).catch((error) => {
      console.error("There was an error!", error);
      alert(`Chyba: ${error}`);
    });
  }

  //********************* GET - specific for filter ***********************

  const filterCars = (ids) => {
    const param = ids.join();
    axios.get(`https://radekmorong.cz/projects/react-php-mysql/backend/?action=getSpec&ids=${param}`).then((response) => {
      if (Array.isArray(response.data)) {
        setCarsToShow(response.data);
      } else {
        console.error("Odpověď serveru není pole.");
      }
    }).catch((error) => {
      console.error("There was an error!", error);
      alert(`Chyba: ${error}`);
    });
  }

  //******************** POST *********************************************

  const insertCar = (car) => {
    axios.post('https://radekmorong.cz/projects/react-php-mysql/backend/', car).then((response) => {
      getCars(); // Opětovné načtení seznamu aut po úspěšném přidání
      alert("Auto úspěšně přidáno.");
    }).catch((error) => {
      console.error("There was an error!", error);
      alert(`Chyba: ${error}`);
    });
  }

  //********************* PUT *********************************************

  const updateCar = (car) => {
    axios.put('https://radekmorong.cz/projects/react-php-mysql/backend/', car).then((response) => {
      getCars();
      alert("Auto úspěšně aktualizováno.");
    }).catch((error) => {
      console.error("There was an error!", error);
      alert(`Chyba: ${error}`);
    });
  }

  //*********************** DELETE *****************************************

  const deleteCar = (id) => {
    axios.delete(`https://radekmorong.cz/projects/react-php-mysql/backend/${id}`).then((response) => {
      getCars();
      alert("Auto úspěšně smazáno.");
    }).catch((error) => {
      console.error("There was an error!", error);
    });
  }

  //************************************************************************
  const handleNewData = (updatedCar, source) => {
    switch (source) {
      case "add-car-form": {
        setNewCar(updatedCar);
        break;
      }
      case "change-car-form": {
        setCarToChange(updatedCar);
        break;
      }
      default:
        break;
    }
  };

  const fillEmptyInfos = (car) => {
    const filledCar = {
      ...car,
      brand: car.brand.trim() ? car.brand : "empty",
      model: car.model.trim() ? car.model : "empty",
      reg: car.reg.trim() ? car.reg : "empty",
      km: parseInt(car.km) || 0,
      year: parseInt(car.year) || 0,
    };
    return filledCar;
  };

  const confirmCar = (car) => {
    return window.confirm(
      "Opravdu chcete odeslat data?\n" +
      `Značka: ${car.brand}\n` +
      `Model: ${car.model}\n` +
      `Reg.značka: ${car.reg}\n` +
      `Kilometry: ${car.km}\n` +
      `Rok výroby: ${car.year}\n`
    );
  };

  const handleUpdate = (source) => {
    let temp;
    switch (source) {
      case "add-car-form": {
        temp = fillEmptyInfos(newCar);
        if (confirmCar(temp)) {
          insertCar(temp);
          setNewCar({
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          });
        }
        break;
      }
      case "change-car-form": {
        temp = fillEmptyInfos(carToChange);
        if (confirmCar(temp)) {
          updateCar(temp);
          setCarToChange({
            id: 0,
            brand: "",
            model: "",
            reg: "",
            km: "",
            year: "",
          });
        }
        break;
      }
      default:
        break;
    }
  };

  const handleDelete = (idToDel) => {
    deleteCar(idToDel);
  };

  const handleEdit = (IdToEdit) => {
    const temp = cars.filter((car) => car.id === IdToEdit);
    setCarToChange(...temp);
  };

  const handleFilterData = (filteredCars) => {
    const ids = filteredCars.map((car) => car.id);
    filterCars(ids);
  };

  const handleReset = () =>{
    setCarsToShow(cars);
  }

  const handleSpzFilter = (spz) => {
    const  temp = spz.toLowerCase()
    const filteredSPZ = cars.filter((car)=> car.reg.toLowerCase().includes(temp));
    setCarsToShow(filteredSPZ);
  }


  return (
    <div className="m-2 container-sm d-flex text-center flex-column justify-content-center">
      <div className="row carList d-flex justify-content-center mt-3">
        <div className="sirkaMaxSedmSetPx d-flex flex-row justify-content-center">
        <div className="col-12">
          <FilterForm data={cars} handleFilterData={handleFilterData} handleReset={handleReset} handleSpz={handleSpzFilter} />
        </div>
      </div>
    </div>      
    <CarList data={carsToShow} handleDelete={handleDelete} handleChange={handleEdit} />
    <h5>Úprava existujícího auta</h5>
    <UpdateForm
      id="change-car-form"
      data={carToChange}
      handleData={handleNewData}
      handleUpdate={handleUpdate}
    />
    <h5>Přidat nové auto</h5>
    <UpdateForm
      id="add-car-form"
      data={newCar}
      handleData={handleNewData}
      handleUpdate={handleUpdate}
    />
    </div>
  );
}

export default App;
