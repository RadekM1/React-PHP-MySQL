import "./CarList.css";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CarList = ({ data, handleDelete, handleChange }) => {

    return (
        <div className="row carList d-flex justify-content-center mt-4">
            <div className="sirkaMaxSedmSetPx">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col" className="text-start">Značka</th>
                            <th scope="col" className="text-start">Model</th>
                            <th scope="col" className="text-start">SPZ</th>
                            <th scope="col" className="text-start">Najeto</th>
                            <th scope="col" className="text-start">Rok</th>
                            <th scope="col" className="text-start"></th>
                            <th scope="col" className="text-start"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td className="text-start small">{item.brand}</td>
                                    <td className="text-start small">{item.model}</td>
                                    <td className="text-start small">{item.reg}</td>
                                    <td className="text-start small">{item.km}</td>
                                    <td className="text-start small">{item.year}</td>
                                    <td>
                                        <IconButton onClick={() => handleChange(item.id)} value={item.id} aria-label="edit" size="small">
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                    </td>
                                    <td>
                                        <IconButton onClick={() => handleDelete(item.id)} value={item.id} aria-label="delete" size="small">
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">
                                    Žádná data k zobrazení
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CarList;
