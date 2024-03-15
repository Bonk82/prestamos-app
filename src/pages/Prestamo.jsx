
// import { DataGrid  } from '@mui/x-data-grid';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';

import { useEffect, useState } from "react";
import { useSupa } from "../context/SupabaseContext";
import { CardFee } from "../components/CardFee";


const Prestamo = () => {
  const {getReg} = useSupa();
  const [cuotasMes, setCuotasMes] = useState([])

  useEffect(()=>{
    cargarData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const cargarData = async () =>{
    const pivot = await getReg('vw_cuotas','dia_pago',false);
    armarCuotas(pivot)
    console.log('las cuotas',pivot);
  }

  const armarCuotas = async (data) =>{
    const hoy = new Date()
    await data.map(c=>{
      c.fecha_cuota = new Date(hoy.getFullYear(),hoy.getMonth(),c.dia_pago).toLocaleDateString();
      c.monto_cuota = c.saldo_capital * (c.porcentaje_interes/100);
    })
    setCuotasMes(data);
  }

  return (
    <div className='grid-cuotas'>
      {cuotasMes.length>0 && cuotasMes.map((c,i)=>{
        return(
          <CardFee key={i} cuota={c} ></CardFee>
        )
      })}
    </div>
  );
}

export default Prestamo


