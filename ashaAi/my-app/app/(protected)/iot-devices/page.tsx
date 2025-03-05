
"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { AlertCircle, HeartPulse, Gauge, Droplet } from 'lucide-react'
import L from 'leaflet'

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const mockDevices = [
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: "Pulse Oximeter",
    value: "98%",
    status: "normal"
  },
  {
    icon: <Gauge className="w-6 h-6" />,
    title: "BP Monitor",
    value: "120/80",
    status: "normal"
  },
  {
    icon: <Droplet className="w-6 h-6" />,
    title: "Glucose",
    value: "90 mg/dL",
    status: "normal"
  }
]

const alertData = {
  device: "BP Monitor",
  value: "150/95",
  location: "Patient #123 (Borpeta)"
}

const patientLocations = [
  { lat: 26.3311, lng: 91.7767, patient: "Patient #123", alert: "High BP" },
  { lat: 26.1818, lng: 91.7463, patient: "Patient #456", alert: "Low SpO2" }
]

export default function IoTDashboard() {
  return (
    <div className="space-y-4">
      {/* Device Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {mockDevices.map((device, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={device.status === "normal" ? "text-green-500" : "text-red-500"}>
                    {device.icon}
                  </span>
                  <CardTitle>{device.title}</CardTitle>
                </div>
                <Badge variant={device.status === "normal" ? "default" : "destructive"}>
                  {device.status === "normal" ? "✅ Normal" : "⚠️ Alert"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-mono font-bold">
                {device.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Card */}
      <Card className="border-destructive">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-destructive" />
              <CardTitle className="text-destructive">Critical Alert</CardTitle>
            </div>
            <Badge variant="destructive">‼️ Immediate Action Needed</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-lg font-semibold">{alertData.device}: {alertData.value}</p>
            <p className="text-sm">Location: {alertData.location}</p>
          </div>
        </CardContent>
      </Card>

      {/* Map View */}
      <Card className="h-[500px]">
        <CardHeader>
          <CardTitle>Patient Locations with Alerts</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(500px-72px)]">
          <MapContainer 
            center={[26.2006, 92.9376]} 
            zoom={7} 
            className="h-full w-full rounded-lg"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {patientLocations.map((location, index) => (
              <Marker key={index} position={[location.lat, location.lng]}>
                <Popup>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{location.patient}</h3>
                    <Badge variant="destructive">{location.alert}</Badge>
                    <p className="text-sm text-muted-foreground">
                      Last update: 5 mins ago
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>
    </div>
  )
}