import { Alert, Backdrop, Button, Chip, CircularProgress, Slide, Snackbar, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useSupa } from '../context/SupabaseContext';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useState } from 'react';


export const CardFee = ({cuota}) => {
  const {loading,createReg,updateReg} = useSupa();
  const [alerta, setAlerta] = useState([false,'success','']);
  const handleClose = ()=>{
    setAlerta([false,'success','vacio']);
  }

  const slideAlert = (props) => {
    return <Slide {...props} direction="up" />;
  }

  const registrarCuota = async (event) => {
    event.preventDefault();
    console.log('el event',event);

    const newPrestamo = cuota
    console.log('new cuota',newPrestamo);
    try {
      await createReg(newPrestamo,'prestamo');
      setAlerta([true,'success','Cuota registrada con éxito!'])
      // await cargarData();
    } catch (error) {
      setAlerta([true,'error',error.message || error])
    }
  }

  const onChangeCuota = async() => {
    console.log('cambios cuota',cuota);
    try {
      delete cuota.nombre
      await updateReg('cuota',cuota);
      setAlerta([true,'success','Cuota actualizada con éxito!'])
      // return e
    } catch (error) {
      setAlerta([true,'danger',error.message || error])
    }
  }

  const handleInput = (e) => {
    const value = e.target.value;
    const pattern = /^\d+(\.\d{0,2})?$/;
    if (!pattern.test(value)) {
      e.target.value = value.slice(0, -1);
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{cuota.nombre}</h3>
        <h4 className="card-subtitle">{cuota.referencia}</h4>
        <div>
          <h4 className="card-info">{cuota.monto}</h4>
          <h4 className="card-info">{new Date(cuota.fecha_desembolso).toLocaleDateString()}</h4>
          {/* <button *ngIf="row.informe" class="btn btn-info" title="Descargar" (click)="obtenerArchivo(row.informe,'auditoria',row.id_cite)"><i class="fa fa-print"></i> Informe</button> */}
        </div>
      </div>
      <div className="card-body">
        <p>Fecha Cuota: <kbd>{cuota.fecha_cuota}</kbd></p>
        <TextField id="monto_cuota" label="Monto Cuota" onInput={handleInput} fullWidth/>
      </div>
      <div className="card-footer">
        <Button
            type="button"
            fullWidth
            variant="contained"
            className='gradient-yard'
            // color='info'
            // sx={{ mt: 1, mb: 3 }}
            disabled ={loading}
            startIcon={<TimelineIcon fontSize='large'/>} 
          >
            Historial
          </Button>
      </div>
      <Snackbar onClose={handleClose} open={alerta[0]} TransitionComponent={slideAlert} autoHideDuration={6000} anchorOrigin={{vertical:'top',horizontal:'right'}}>
      <Alert severity={alerta[1]} sx={{ width: '100%' }}> {alerta[2]}</Alert>
      </Snackbar>
      <Backdrop sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" size='7rem' thickness={5} />
      </Backdrop>
    </div>
  )
}

CardFee.propTypes = {
  cuota: PropTypes.shape({
    nombre: PropTypes.string.isRequired, // Ejemplo de una propiedad de tipo string requerida
    apodo: PropTypes.string,
    monto: PropTypes.number,
    dia_pago: PropTypes.number,
    porcentaje_interes: PropTypes.number,
    fecha_desembolso: PropTypes.string,
    fid_cliente : PropTypes.number,
    id: PropTypes.number,
    fecha_cuota: PropTypes.string,
    fecha_pago: PropTypes.string,
    monto_cuota: PropTypes.number,
    monto_pago: PropTypes.number,
    fid_prestamo: PropTypes.number,
    referencia:PropTypes.string,
  }).isRequired,
};