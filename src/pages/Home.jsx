import { Button } from "@mui/material"
import { useSupa } from "../context/SupaContext";

export const Home = () => {
  const { adding, createCliente, clientes, getClientes } = useSupa();

  
  console.log(clientes);

  const insertarCliente = async () =>{
    console.log(adding);
    await createCliente('Francisco Macuaga Acosta','Panchin','19791108','1234567','+591 642784')
    await getClientes();
    console.log(clientes);
    console.log(adding);
  }


  return (
    <div>
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
