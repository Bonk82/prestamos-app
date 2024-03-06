
export const NotFound = () => {
  return (
    <div>
      <h1 style={{letterSpacing:'1.6rem',fontWeight:'bolder',color:'powderblue',fontSize:'140px',borderBottom:'2px solid powderblue'}}>404</h1>
      <p style={{letterSpacing:'0.15rem',fontSize:'22px'}}>Oops! esta ruta es inaccesible, por favor retorne a la <a href="javascript:history.back()">pagina anterior</a> o al <a href="/">inicio</a>.</p>
    </div>
  )
}
