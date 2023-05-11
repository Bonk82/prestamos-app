import { Button } from "@mui/material"

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Button variant="contained" className='gradient-primary'>Hello World custom gradient</Button>
      <Button variant="contained">Hello World primary</Button>
      <Button variant="contained" color='secondary'>Hello World secondary</Button>
      <Button variant="contained" color='success'>Hello World success</Button>
      <Button variant="contained" color='error'>Hello World error</Button>
      <Button variant="contained" color='warning'>Hello World warning</Button>
      <Button variant="contained" color='info'>Hello World warning</Button>
    </div>
    
  )
}

export default Dashboard