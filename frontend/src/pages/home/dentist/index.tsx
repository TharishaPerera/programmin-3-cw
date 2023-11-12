import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Edit, ToggleLeft, ToggleRight, Trash } from 'lucide-react'
import { Link } from 'react-router-dom'

const Dentists = () => {
  return (
    <div className="w-screen px-28 space-y-10">
      <div className="flex justify-between items-center">
        <h2 className="text-center text-2xl font-semibold">Dentists</h2>
        <Link to="/appointments/create" className="">
          <Button className="uppercase">Create</Button>
        </Link>
      </div>
      <div>
        <Table>
          <TableCaption>A list of dentists.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Patient Mobile</TableHead>
              <TableHead>Appointment Status</TableHead>
              <TableHead>Registration Fee</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          {/* <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.appointmentDate}</TableCell>
                <TableCell>{item.appointmentTime}</TableCell>
                <TableCell>
                  {item.patient.firstName + " " + item.patient.lastName}
                </TableCell>
                <TableCell>{item.patient.mobile}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.regFeeStatus}</TableCell>
                <TableCell className="items-center">
                  <Button onClick={() => handleEdit(item.appointmentId)} variant="secondary" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleAppointmentStatus(item.appointmentId)}
                    variant="secondary"
                    size="icon"
                  >
                    {item.status == "COMPLETE" ? (
                      <ToggleRight className="w-4 h-4" />
                    ) : (
                      <ToggleLeft className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    onClick={() => handleDelete(item.appointmentId)}
                    variant="secondary"
                    size="icon"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </div>
    </div>
  )
}

export default Dentists