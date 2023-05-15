import { Button } from "@mui/material"
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { AdminClient } from "../components/AdminClient";

const Dashboard = () => {
  return (
    <div>
      <label className="titulo">Dashboard</label><br />
      <p>acá irán todo los componentes para ver los balances de dinero a gusto, puros componentes</p>
      <Button variant="outlined" startIcon={<PersonAddAltIcon/>} color="primary">Registrar Prestamo</Button>
      <Button variant="contained" startIcon={<PersonAddAltIcon/>} className="gradient-primary">Registrar Prestamo</Button>
      <AdminClient/>
    </div>
    
  )
}

export default Dashboard