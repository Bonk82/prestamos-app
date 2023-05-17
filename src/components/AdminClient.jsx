import { Alert, Backdrop, Box, Button, CircularProgress, Container, Grid, IconButton, Slide, Snackbar, TextField, Typography } from "@mui/material"
import { DataGrid,GridCellEditStopReasons,esES } from '@mui/x-data-grid';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";
import {useSupa} from '../context/SupaContext'


export const AdminClient = () => {
  const {getClientes, updateCliente, adding, createCliente} = useSupa();
  const [clientes, setClientes] = useState([]);
  const [openSpinner, setOpenSpinner] = useState(false);
  const [alerta, setAlerta] = useState([false,'success','']);




  useEffect(()=>{
    cargarClientes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const cargarClientes = async() =>{
    const resp = await getClientes();
    setClientes(resp);
  }


  const onChangeCliente = async(e) => {
    console.log('cambios cliente',e);
    setOpenSpinner(true);
    try {
      // const nuevoObj  = {golesA:Number(e.golesA),golesB:Number(e.golesB),finalizado:true}
      await updateCliente(e.id,e);
    } catch (error) {
      setAlerta([true,'danger','Error al actualizar cliente'])
    } finally{
      // await getClientes();
      setAlerta([true,'success','Cliente actualizado con éxito!'])
      setOpenSpinner(false);
    }
  }

  

  const colClientes = [
    {field: 'Acciones', headerName: 'Acciones', sortable: false, maxWidth:70,
      renderCell: (params) => {
        return <IconButton onClick={()=>onChangeCliente(params.row)} title='Actualizar Cliente' color={params.row.finalizado? 'success':'secondary'}>
                {params.row.finalizado? <CheckCircleIcon fontSize="large"/>:<SaveAsIcon fontSize="large"/>} 
              </IconButton>;
      },
    },
    {field:'nombre',headerName:'Nombre', minWidth:90, align:'left',type:'text',editable:true, headerClassName: 'super-app-theme--header',},
    {field:'apodo',headerName:'Alias', minWidth:90, align:'left',type:'text',editable:true},
    {field:'fecha_nacimiento',headerName:'Fecha Nacimiento', minWidth:90, align:'left',type:'date',editable:true,
    valueFormatter: (params) => {
      if (params.value == null) return ''
      const formateado = new Date(params.value).toLocaleDateString();
      return `${formateado}`;
    },},
    {field:'ci',headerName:'Documento', minWidth:90,  align:'left',type:'text',editable:true},
    {field:'telefonos',headerName:'Teléfonos', minWidth:100,type:'tel',editable:true},
    {field:'id',headerName:'ID'},
  ]

  const handleClose = ()=>{
    setAlerta([false,'success','vacio']);
  }

  const slideAlert = (props) => {
    return <Slide {...props} direction="up" />;
  }

  const registrarCliente = async (event) => {
    event.preventDefault();
    console.log('el event',event);
    setOpenSpinner(true);
    const data = new FormData(event.currentTarget);
    const newCliente = {
      nombre:data.get('nombre'),
      apodo:data.get('apodo'),
      ci:data.get('ci'),
      fecha_nacimiento:data.get('fecha_nacimiento'),
      telefonos:data.get('telefonos'),
    }
    console.log('el new cliente',newCliente);
    await createCliente(newCliente);
    setAlerta([true,'success','Cliente registrado con éxito!'])
    await cargarClientes();
    setOpenSpinner(false);
  };

  return (
    <Container maxWidth='XL'>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" color='inherit' sx={{fontWeight:500,bgcolor:'primary.main',borderRadius:1,pl:4,mb:1}}>Nuevo Cliente</Typography>
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
              autoComplete="off"
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className='gradient-yard'
              sx={{ mt: 1, mb: 3 }}
              disabled ={adding}
              startIcon={<PersonAddAltIcon/>} 
            >
              Registrar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} >
          {/* <Button variant="contained" startIcon={<PersonAddAltIcon/>} className="gradient-yard" onClick={handleNuevo} disabled={registrando} >Registrar Cliente</Button> */}
          <Typography variant="h5" color='inherit' sx={{fontWeight:500,bgcolor:'primary.main',borderRadius:1,pl:4,mb:1}}>Lista de Clientes</Typography>
          <Box sx={{ height:{xs:330,md:440}, width:{xs:'100%',md:'100%'},justifyContent:'center',mt:2}}>
          <DataGrid
            rows={clientes}
            columns={colClientes}
            initialState={{
              pagination: {
                pageSize: 10,
              },
            }}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            onCellEditStop={(params, event) => {
              console.log(params,event)
              if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                event.defaultMuiPrevented = true;//aca levantar un prompt para confirmar la edicion
              }
            }}
            columnVisibilityModel={{id:false}}
            rowHeight={80}
            rowsPerPageOptions={[5, 10, 20]}
            pageSize={5}
            // sortModel={[{field:'fechaPartido'}]}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          />
          </Box>
        </Grid>
      </Grid>
      <Snackbar onClose={handleClose} open={alerta[0]} TransitionComponent={slideAlert} autoHideDuration={6000} anchorOrigin={{vertical:'top',horizontal:'right'}}>
      <Alert severity={alerta[1]} sx={{ width: '100%' }}> {alerta[2]}</Alert>
      </Snackbar>
      <Backdrop sx={{ color: 'primary.main', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openSpinner}>
        <CircularProgress color="inherit" size='7rem' thickness={5} />
      </Backdrop>
    </Container>
  )
}
