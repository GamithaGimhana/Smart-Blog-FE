import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <Header/>
        <main className='flex items-center justify-center flex-1 p-6'>
            <Outlet />      {/* nested routes will be rendered here. pages maru weddi mek witharai wens wenne. header ek ehemmama thiyenw */}
        </main>
    </div>
  )
}
