import { Alert, Backdrop, Box, Button, CircularProgress, Container, Grid, IconButton, Slide, Snackbar, TextField, Typography } from "@mui/material"
import { DataGrid,esES } from '@mui/x-data-grid';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import {useSupa} from '../context/SupabaseContext'


export const AdminClient = () => {
  const {loading,createReg,getReg,updateReg,deleteReg,clientes} = useSupa();
  const [alerta, setAlerta] = useState([false,'success','']);

  useEffect(()=>{
    cargarClientes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const cargarClientes = async() =>{
    await getReg('cliente','id',false);//getClientes();
  }

  const registrarCliente = async (event) => {
    event.preventDefault();
    console.log('el event',event);
    const data = new FormData(event.currentTarget);
    const newCliente = {
      nombre:data.get('nombre'),
      apodo:data.get('apodo'),
      ci:data.get('ci'),
      fecha_nacimiento:data.get('fecha_nacimiento'),
      telefonos:data.get('telefonos'),
      direccion:data.get('direccion'),
    }
    console.log('new client',newCliente);
    await createReg(newCliente,'cliente');
    setAlerta([true,'success','Cliente registrado con éxito!'])
    await cargarClientes();
  }

  const onChangeCliente = async(e) => {
    console.log('cambios cliente',e);
    try {
      await updateReg('cliente',e);
      setAlerta([true,'success','Cliente actualizado con éxito!'])
      return e
    } catch (error) {
      setAlerta([true,'danger','Error al actualizar cliente'])
    }
  }

  const onDeleteCliente = async(e) => {
    console.log('delete cliente',e);
    const r = confirm('Realmente desea eliminar el registro?');
    if(!r) return false;
    try {
      // const nuevoObj  = {golesA:Number(e.golesA),golesB:Number(e.golesB),finalizado:true}
      await deleteReg('cliente',e.id);
      setAlerta([true,'success','Cliente eliminado satisfactoriamente!'])
      return e
    } catch (error) {
      setAlerta([true,'danger','Error al eliminar cliente'])
    }
  }

  const colClientes = [
    {field: 'Acciones', headerName: 'Acciones', sortable: false, maxWidth:150,
      renderCell: (params) => {
        return  (<div style={{display:'flex',justifyContent:'space-between'}}>
          <IconButton onClick={()=>onChangeCliente(params.row)} title='Actualizar Cliente' color={params.row.finalizado? 'success':'secondary'}>
            {params.row.finalizado? <CheckCircleIcon fontSize="large"/>:<SaveAsIcon fontSize="large"/>} 
          </IconButton>
          <IconButton onClick={()=>onDeleteCliente(params.row)} title='Eliminar Cliente' color={'error'}>
           <DeleteIcon fontSize="large"/>
          </IconButton>  
        </div> )
      },
    },
    {field:'nombre',headerName:'Nombre', minWidth:250, align:'left',type:'text',editable:true, headerClassName: 'super-app-theme--header',},
    {field:'apodo',headerName:'Alias', minWidth:90, align:'left',type:'text',editable:true},
    {field:'fecha_nacimiento',headerName:'Fecha Nacimiento', minWidth:90, align:'left',type:'date',editable:true,
    valueFormatter: (params) => {
      if (params.value == null) return ''
      const formateado = new Date(params.value).toLocaleDateString();
      return `${formateado}`;
    },},
    {field:'ci',headerName:'Documento', minWidth:90,  align:'left',type:'text',editable:true},
    {field:'telefonos',headerName:'Teléfonos', minWidth:100,type:'tel',editable:true},
    {field:'direccion',headerName:'Dirección', minWidth:100,type:'text',editable:true},
    {field:'id',headerName:'ID'},
  ]

  const handleClose = ()=>{
    setAlerta([false,'success','vacio']);
  }

  const slideAlert = (props) => {
    return <Slide {...props} direction="up" />;
  }

  return (
    <Container maxWidth='XL'>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" color='inherit' sx={{fontWeight:500,letterSpacing:'0.5rem',bgcolor:'primary.main',borderRadius:1,pl:4,mb:1}}>Nuevo Cliente</Typography>
          <Box component="form" onSubmit={registrarCliente}>
            <TextField
              margin="dense"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="apodo"
              label="Apodo"
              type="text"
              id="apodo"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="ci"
              label="Documento"
              type="ci"
              id="ci"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="fecha_nacimiento"
              label="Fecha Nacimiento"
              type="date"
              id="fecha_nacimiento"
              placeholder="dd-mm-yyyy"
              autoComplete="off"
              InputLabelProps={{
                style: { top: '-0.8rem',fontSize:'0.8rem' },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="telefonos"
              label="Telefonos"
              type="tel"
              id="telefonos"
              autoComplete="off"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="direccion"
              label="Direccion"
              type="text"
              id="direccion"
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className='gradient-yard'
              sx={{ mt: 1, mb: 3 }}
              disabled ={loading}
              startIcon={<PersonAddAltIcon/>} 
            >
              Registrar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} >
          <Typography variant="h5" color='inherit' sx={{fontWeight:500,letterSpacing:'0.5rem',bgcolor:'primary.main',borderRadius:1,pl:4,mb:1}}>Lista de Clientes</Typography>
          <Box sx={{ height:{xs:330,md:505}, width:{xs:'100%',md:'100%'},justifyContent:'center',mt:2}}>
          <DataGrid
            rows={clientes}
            columns={colClientes}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            // disableSelectionOnClick
            processRowUpdate={onchange}
            // onProcessRowUpdateError={handleProcessRowUpdateError}
            experimentalFeatures={{ newEditingApi: true }}
            columnVisibilityModel={{id:false}}
            rowHeight={48}
            pageSizeOptions={[10, 20, 50]}
            pageSize={10}
            // sortModel={[{field:'fechaPartido'}]}
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
    </Container>
  )
}
