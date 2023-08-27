import { Button } from "@mui/material"
import { useSupa } from "../context/SupabaseContext";

export const Home = () => {
  const { adding, createCliente, clientes, getClientes } = useSupa();

  const insertarCliente = async () =>{
    console.log(adding);
    await createCliente('Francisco Macuaga Acosta','Panchin',new Date(),'1234567','+591 642784','c/ Cañada Strongest detras del coliceo cerrado')
    await getClientes();
    console.log(clientes);
    console.log(adding);
  }


  return (
    <div>
      <label className="titulo">Inicio</label><br />
      Se cargara dashboard o prestamos segun el rol del user
      <Button
      variant="outlined"
      color="primary"
      fullWidth
      onClick={insertarCliente}
      disabled={adding}
      >INSERTAR</Button>
    </div>
  )
}
