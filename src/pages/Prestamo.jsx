
// import { DataGrid  } from '@mui/x-data-grid';
// import Snackbar from '@mui/material/Snackbar';
// import Alert from '@mui/material/Alert';

import { useEffect, useState } from "react";
import { useSupa } from "../context/SupabaseContext";
import { CardFee } from "../components/CardFee";


const Prestamo = () => {
  const {getReg,cuotas} = useSupa();
  const [cuotasMes, setCuotasMes] = useState([])

  useEffect(()=>{
    cargarData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[cuotas])

  const cargarData = async () =>{
    const pivot = await getReg('vw_cuotas','dia_pago',true);
    armarCuotas(pivot)
    console.log('las cuotas',pivot);
  }

  const armarCuotas = async (data) =>{
    const hoy = new Date()
    await data.map(c=>{
      c.fecha_cuota = new Date(hoy.getFullYear(),hoy.getMonth(),c.dia_pago);
      c.monto_cuota = c.saldo_capital * (c.porcentaje_interes/100);
      if(!c.porcentaje_interes) c.monto_cuota = c.saldo_capital;
    })
    setCuotasMes(data);
  }

  return (
    <div className='grid-cuotas'>
      {cuotasMes.length>0 && cuotasMes.map((c,i)=>{
        console.log('repintando',i,c);
        return(
          <CardFee key={i} cuota={c} ></CardFee>
        )
      })}
    </div>
  );
}

export default Prestamo


