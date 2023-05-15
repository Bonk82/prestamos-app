import { Alert, Backdrop, Box, Button, CircularProgress, Container, Grid, IconButton, Slide, Snackbar, Typography } from "@mui/material"
import { DataGrid,esES } from '@mui/x-data-grid';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState } from "react";
import {useSupa} from '../context/SupaContext'


export const AdminClient = () => {
  const {getClientes,clientes, updateCliente} = useSupa();
  // const [clientes, setClientes] = useState([]);
  const [registrando, setRegistrando] = useState(false)
  const [openSpinner, setOpenSpinner] = useState(false);
  const [alerta, setAlerta] = useState([false,'success','']);



  useEffect(()=>{
    getClientes();
    console.log('iniciando admin',clientes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const onChangeCliente = async(e) => {
    console.log(e);
    setOpenSpinner(true);
    try {
      const nuevoObj  = {golesA:Number(e.golesA),golesB:Number(e.golesB),finalizado:true}
      await updateCliente(e.id,nuevoObj);
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
        return <IconButton onClick={()=>onChangeCliente(params.row)} title='Actualizar Cliente' color={params.row.finalizado? 'success':'primary'}>
                {params.row.finalizado? <CheckCircleIcon fontSize="large"/>:<SaveAsIcon fontSize="large"/>} 
              </IconButton>;
      },
    },
    {field:'nombre',headerName:'Nombre', minWidth:90, align:'left',editable:true},
    {field:'apodo',headerName:'Alias', minWidth:90, align:'left',editable:true},
    {field:'fecha_nacimiento',headerName:'Fecha Nacimiento', minWidth:90, align:'left',editable:true,
    valueFormatter: (params) => {
      if (params.value == null) return ''
      const formateado = new Date(params.value).toLocaleDateString();
      return `${formateado}`;
    },},
    {field:'ci',headerName:'Documento', minWidth:90,  align:'left',editable:true},
    {field:'telefonos',headerName:'Teléfonos', minWidth:100,editable:true},
    {field:'id',headerName:'ID'},
  ]



  const handleClose = ()=>{
    setAlerta([false,'success','vacio']);
  }

  const slideAlert = (props) => {
    return <Slide {...props} direction="up" />;
  }

  const handleNuevo = () =>{
    setRegistrando(true)
  }

  return (
    <Container maxWidth='XL'>
      <Grid container spacing={1}>
        {registrando && <Grid item xs={12} md={6}>
          aca el form
        </Grid>}
        <Grid item xs={12} md={6} >
          <Button variant="outlined" startIcon={<PersonAddAltIcon/>} color="primary" onClick={handleNuevo} disabled={registrando} >Registrar Cliente</Button>
          <Box sx={{ height:{xs:350,md:700}, width:{xs:'100vw',md:'100%'},justifyContent:'center',mt:2,paddingX:0.5}}>
          <Typography variant="h5" color='inherit' sx={{fontWeight:500,bgcolor:'primary.main',borderRadius:1,pl:4,mb:1}}>Lista de Clientes</Typography>
          <DataGrid
            rows={clientes}
            columns={colClientes}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            columnVisibilityModel={{id:false}}
            rowHeight={80}
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
