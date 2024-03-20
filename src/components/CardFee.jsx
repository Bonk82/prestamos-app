import { Alert, Backdrop, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, Snackbar, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useSupa } from '../context/SupabaseContext';
import TimelineIcon from '@mui/icons-material/Timeline';
import React, { useEffect, useState } from 'react';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CardFee = ({cuota}) => {
  const {loading,createReg,updateReg} = useSupa();
  const [open, setOpen] = useState(false)
  const [alerta, setAlerta] = useState([false,'success','']);

  useEffect(() => {
    evaluateState()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const evaluateState = () =>{
    if(cuota.fecha_pago) document.getElementById('kbd'+cuota.id_prestamo).classList.add('paid')
    if(!cuota.fecha_pago && (new Date() > new Date(cuota.fecha_cuota)))  document.getElementById('kbd'+cuota.id_prestamo).classList.add('delay')
  }

  const handleClose = ()=>{
    setAlerta([false,'success','vacio']);
  }

  const slideAlert = (props) => {
    return <Slide {...props} direction="up" />;
  }

  const registrarCuota = async (data) => {
    console.log('new cuota',data);
    try {
      await createReg(data,'cuota');
      setAlerta([true,'success','Cuota registrada con éxito!'])
      // await cargarData();
    } catch (error) {
      setAlerta([true,'error',error.message || error])
    }
  }

  const onChangeCuota = async(data) => {
    console.log('cambios cuota',data);
    try {
      await updateReg('cuota',data);
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

  const handleSave = () =>{
    const laNuevaCuota = {
      fecha_cuota:cuota.fecha_cuota,
      fecha_pago:new Date(),
      monto_cuota:cuota.monto_cuota,
      monto_pago:document.getElementById('mc'+cuota.id_prestamo)?.value,
      fid_prestamo:cuota.id_prestamo
    }
    console.log('la cuota',cuota);
    if(cuota.id){
      laNuevaCuota.id = cuota.id;
      onChangeCuota(laNuevaCuota);
    }else{
      registrarCuota(laNuevaCuota);
    } 
  }

  const handleHistory = ()=>{
    setOpen(true)
  }

  const handleCloseHistory = ()=>{
    setOpen(false)
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{cuota.apodo}</h2>
        <h4 className="card-subtitle">{cuota.referencia}</h4>
        <div>
          <h4 className="card-info">{cuota.monto}</h4>
          <h4 className="card-info">{new Date(cuota.fecha_desembolso + ' 05:00').toLocaleDateString()}</h4>
          {/* <button *ngIf="row.informe" class="btn btn-info" title="Descargar" (click)="obtenerArchivo(row.informe,'auditoria',row.id_cite)"><i class="fa fa-print"></i> Informe</button> */}
        </div>
      </div>
      <div className="card-body">
        <p>Fecha {cuota.fecha_pago ? 'Pago':'Cuota'}: <kbd id={'kbd'+cuota.id_prestamo}>{cuota.fecha_pago ? new Date(cuota.fecha_pago + ' 05:00').toLocaleDateString() : new Date(cuota.fecha_cuota).toLocaleDateString()}</kbd></p>
        <div>
          <TextField id={'mc'+cuota.id_prestamo} label="Monto Cuota" onInput={handleInput}sx={{width:'80%'}} defaultValue={cuota.monto_pago || cuota.monto_cuota}/>
          <IconButton disabled ={loading} color="primary" onClick={handleSave}><MonetizationOnIcon fontSize='large'/></IconButton>
        </div>
      </div>
      <div className="card-footer">
        <Button
          type="button"
          fullWidth
          variant="contained"
          className='gradient-yard'
          // color='info'
          // sx={{ mt: 1, mb: 3 }}
          onClick={handleHistory}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseHistory}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
          <p>porbando</p>
        </DialogContent>
        <DialogActions>
          <Button variant='outlined' color='info' onClick={handleCloseHistory}>Cerrar</Button>
          <Button variant='outlined' color='success' onClick={handleCloseHistory}>Reporte</Button>
        </DialogActions>
      </Dialog>
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
    fecha_cuota: PropTypes.instanceOf(Date),
    fecha_pago: PropTypes.string,
    monto_cuota: PropTypes.number,
    monto_pago: PropTypes.number,
    fid_prestamo: PropTypes.number,
    referencia:PropTypes.string,
    id_prestamo:PropTypes.number
  }).isRequired,
};