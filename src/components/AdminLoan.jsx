import { Alert, Backdrop, Box, Button, CircularProgress, Container, Dialog, DialogActions, DialogTitle
  , Grid, IconButton, MenuItem, Slide, Snackbar, TextField, Typography } from "@mui/material"
import { DataGrid,esES } from '@mui/x-data-grid';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import {useSupa} from '../context/SupabaseContext'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { esES as pikerEs } from '@mui/x-date-pickers/locales';
import 'dayjs/locale/es';

export const AdminLoan = () => {

  const {loading,createReg,getReg,updateReg,deleteReg,clientes,prestamos} = useSupa();
  const [alerta, setAlerta] = useState([false,'success','']);
  const [fechaDesembolso, setFechaDesembolso] = useState(null);
  const [fechaFinalizacion, setFechaFinalizacion] = useState(null);
  const [preguntar, setPreguntar] = useState(false);
  const [dataPivot, setDataPivot] = useState(null);

  useEffect(()=>{
    cargarData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const cargarData = async() =>{
    await getReg('cliente','id',false);//getClientes();
    await getReg('vw_prestamos','id',false);//getClientes();
    // adecuarPrestamos(c,p);
  }

  const registrarPrestamo = async (event) => {
    event.preventDefault();
    console.log('el event',event);
    const data = new FormData(event.currentTarget);
    const newPrestamo = {
      fid_cliente:data.get('nombre'),
      fecha_desembolso:fechaDesembolso,
      monto:data.get('monto'),
      porcentaje_interes:data.get('porcentaje_interes'),
      fecha_finalizacion:fechaFinalizacion,
      dia_pago:data.get('dia_pago'),
      estado:'ACTIVO',
      referencia:data.get('referencia'),
    }
    console.log('new prestamo',newPrestamo);
    try {
      await createReg(newPrestamo,'prestamo');
      setAlerta([true,'success','Préstamo registrado con éxito!'])
      await cargarData();
    } catch (error) {
      setAlerta([true,'error',error.message || error])
    }
  }

  const onChangePrestamo = async(e) => {
    console.log('cambios prestamo',e);
    try {
      delete e.nombre
      await updateReg('prestamo',e);
      setAlerta([true,'success','Préstamo actualizado con éxito!'])
      return e
    } catch (error) {
      setAlerta([true,'danger',error.message || error])
    }
  }

  const openConfirm = (e) => {
    setPreguntar(true);
    setDataPivot(e);
  }

  const onDeletePrestamo = async(e) => {
    console.log('delete prestamo',e);
    try {
      await deleteReg('prestamo',e.id);
      setAlerta([true,'success','Préstamo eliminado satisfactoriamente!'])
      // return e
    } catch (error) {
      setAlerta([true,'danger','Error al eliminar préstamo'])
    } finally{
      setPreguntar(false)
      setDataPivot(null)
    } 
  }

  const colPrestamos = [
    {field: 'Acciones', headerName: 'Acciones', sortable: false, maxWidth:150,
      renderCell: (params) => {
        return  (<div style={{display:'flex',justifyContent:'space-between'}}>
          <IconButton onClick={()=>onChangePrestamo(params.row)} title='Actualizar Préstamo' color={params.row.finalizado? 'success':'secondary'}>
            {params.row.finalizado? <CheckCircleIcon fontSize="large"/>:<SaveAsIcon fontSize="large"/>} 
          </IconButton>
          <IconButton onClick={()=>openConfirm(params.row)} title='Eliminar Préstamo' color={'error'}>
           <DeleteIcon fontSize="large"/>
          </IconButton>  
        </div> )
      },
    },
    {field:'nombre',headerName:'Cliente', minWidth:250, align:'left',type:'text',editable:true, headerClassName: 'super-app-theme--header',},
    {field:'fecha_desembolso',headerName:'Fecha Desembolso', minWidth:90, align:'left',type:'date',editable:true,
    valueFormatter: (params) => {
      if (params.value == null) return ''
      const formateado = new Date(params.value).toLocaleDateString();
      return `${formateado}`;
    },},
    {field:'monto',headerName:'Monto Préstamo', minWidth:90, align:'left',type:'text',editable:true},
    {field:'porcentaje_interes',headerName:'Porcentaje Interes', minWidth:90,  align:'left',type:'number',editable:true},
    {field:'dia_pago',headerName:'Dia de Pago', minWidth:100,type:'number',editable:true},
    {field:'fecha_finalizacion',headerName:'Fecha Finalizacion', minWidth:90, align:'left',type:'date',editable:true,
    valueFormatter: (params) => {
      if (params.value == null) return ''
      const formateado = new Date(params.value).toLocaleDateString();
      return `${formateado}`;
    },},
    {field:'estado',headerName:'Estado', minWidth:100,type:'text',editable:true},
    {field:'referencia',headerName:'Referencia', minWidth:100,type:'text',editable:true},
    {field:'id',headerName:'ID'},
  ]

  const handleClose = ()=>{
    setAlerta([false,'success','vacio']);
  }

  const slideAlert = (props) => {
    return <Slide {...props} direction="up" />;
  }

  const onChangeFechaDesembolso = (e) =>{
    console.log('entrando on change',e.$d);
    console.log('entrando on change',dayjs(e.$d).format('DD/MM/YYYY'));
    setFechaDesembolso(e)
  }
  const onChangeFechaFinalizacion = (e) =>{
    console.log('entrando on change',e.$d);
    console.log('entrando on change',dayjs(e.$d).format('DD/MM/YYYY'));
    setFechaFinalizacion(e)
  }

  const handleInput = (e) => {
    const value = e.target.value;
    const pattern = /^\d+(\.\d{0,2})?$/;
    if (!pattern.test(value)) {
      e.target.value = value.slice(0, -1);
    }
  }

  return (
    <Container maxWidth='XL'>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" color='inherit' sx={{fontWeight:500,letterSpacing:'0.5rem',bgcolor:'primary.main',borderRadius:1,pl:4,mb:1}}>Nuevo Préstamo</Typography>
          <Box component="form" onSubmit={registrarPrestamo}>
            <TextField
              margin="normal"
              required
              fullWidth
              select
              name="nombre"
              label="Cliente"
              id="nombre"
            >
              {clientes.map(c => (
                    <MenuItem value={c.id} key={c.id}>{c.nombre}</MenuItem>
                  )
                )}
            </TextField>
            <div style={{width:'100%',margin:'1rem 0 0.5rem 0'}}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
                localeText={pikerEs.components.MuiLocalizationProvider.defaultProps.localeText}
              >
                <DatePicker name="fecha_desembolso" label="Fecha Desembolso *" onChange={onChangeFechaDesembolso} />
              </LocalizationProvider>
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="monto"
              label="Monto Desembolso"
              id="monto"
              autoComplete="off"
              onInput={handleInput}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="porcentaje_interes"
              label="porcentaje_interes"
              onInput={handleInput}
              id="porcentaje_interes"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="dia_pago"
              label="Dia Vencimiento Cuota"
              type="text"
              id="dia_pago"
              autoComplete="off"
              onInput={handleInput}
            />
            <div style={{width:'100%',margin:'1rem 0 0.5rem 0'}}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="es"
                localeText={pikerEs.components.MuiLocalizationProvider.defaultProps.localeText}
              >
                <DatePicker name="fecha_finalizacion" label="Fecha Finalizacion *" onChange={onChangeFechaFinalizacion} />
              </LocalizationProvider>
            </div>
            <TextField
              margin="normal"
              required
              fullWidth
              name="referencia"
              label="Referencia"
              type="text"
              id="referencia"
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className='gradient-yard'
              sx={{ mt: 1, mb: 3 }}
              disabled ={loading}
              startIcon={<PointOfSaleIcon/>} 
            >
              Registrar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} >
          <Typography variant="h5" color='inherit' sx={{fontWeight:500,letterSpacing:'0.5rem',bgcolor:'primary.main',borderRadius:1,pl:4,mb:1}}>Lista de Préstamos</Typography>
          <Box sx={{ height:{xs:330,md:505}, width:{xs:'100%',md:'100%'},justifyContent:'center',mt:2}}>
          <DataGrid
            rows={prestamos}
            columns={colPrestamos}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            experimentalFeatures={{ newEditingApi: true }}
            columnVisibilityModel={{id:false}}
            rowHeight={48}
            pageSizeOptions={[10, 20, 50]}
            pageSize={10}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
          </Box>
        </Grid>
      </Grid>
      <Snackbar onClose={handleClose} open={alerta[0]} TransitionComponent={slideAlert} autoHideDuration={6000} anchorOrigin={{vertical:'top',horizontal:'right'}}>
      <Alert severity={alerta[1]} sx={{ width: '100%' }}> {alerta[2]}</Alert>
      </Snackbar>
      <Backdrop sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" size='7rem' thickness={5} />
      </Backdrop>
      <Dialog open={preguntar} onClose={()=>setPreguntar(false)}>
        <DialogTitle id="dt">{"Realmente desea eliminar el registro?"}</DialogTitle>
        <DialogActions>
          <Button onClick={()=>setPreguntar(false)} autoFocus>Cancelar</Button>
          <Button color="error"  onClick={()=>onDeletePrestamo(dataPivot)}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
