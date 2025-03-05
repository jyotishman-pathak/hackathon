import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Filter, Plus, MapPin, Stethoscope, PackageCheck, Baby, Download } from "lucide-react"

const patients = [
  {
    id: "PAT001",
    name: "Mina Das",
    age: 26,
    location: "Barpeta Village",
    lastVisit: "2024-03-20",
    status: "High Risk",
    pregnancy: { trimester: 3, weeks: 32 },
    vitals: { bp: "138/90", hb: 10.5 },
    visits: 5
  },
  {
    id: "PAT002",
    name: "Priya Sharma",
    age: 22,
    location: "Sorbhog Sector 2",
    lastVisit: "2024-03-18",
    status: "Normal",
    pregnancy: { trimester: 2, weeks: 24 },
    vitals: { bp: "120/80", hb: 12.0 },
    visits: 3
  }
]

export default function PatientRecords() {
  return (
    <div className="space-y-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Stethoscope className="w-6 h-6" />
          Patient Registry
        </h1>
        <div className="flex gap-2">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Patient
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">127</div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <PackageCheck className="w-4 h-4" />
              89 Pregnant Women
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Baby className="w-4 h-4" />
              38 Children
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">High Risk Cases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">23</div>
            <Progress value={18} className="h-2 mt-2 bg-red-100" />
            <div className="text-sm text-muted-foreground mt-2">
              15% increase from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>New Registrations</span>
              <Badge variant="secondary">+12</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Pending Follow-ups</span>
              <Badge variant="destructive">8</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patient List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-4">
            <Input placeholder="Search patients..." className="max-w-[300px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Pregnant Women</DropdownMenuItem>
                <DropdownMenuItem>High Risk</DropdownMenuItem>
                <DropdownMenuItem>Children (0-5)</DropdownMenuItem>
                <DropdownMenuItem>Immunization Due</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Badge variant="outline" className="gap-2">
            <MapPin className="w-4 h-4" />
            Barpeta District
          </Badge>
        </CardHeader>
        
        <CardContent>
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Pregnancy Status</TableHead>
                  <TableHead>Vitals</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              
              <TableBody>
                {patients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell className="font-medium">{patient.id}</TableCell>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.age}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {patient.location}
                      </div>
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell>
                      {patient.pregnancy ? (
                        <Badge variant="outline" className="gap-2">
                          T{patient.pregnancy.trimester}
                          <span className="text-muted-foreground">
                            ({patient.pregnancy.weeks} weeks)
                          </span>
                        </Badge>
                      ) : (
                        <Badge variant="secondary">N/A</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex gap-2">
                          <span className={`font-mono ${
                            parseInt(patient.vitals.bp.split('/')[0]) > 130 ? 
                            'text-red-600' : 'text-green-600'
                          }`}>
                            BP: {patient.vitals.bp}
                          </span>
                          <span className={`font-mono ${
                            patient.vitals.hb < 11 ? 
                            'text-yellow-600' : 'text-green-600'
                          }`}>
                            Hb: {patient.vitals.hb}g
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Field Data Collection Floating Button */}
      <div className="fixed bottom-8 right-8">
        <Button className="rounded-full h-14 w-14 shadow-lg">
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  )
}