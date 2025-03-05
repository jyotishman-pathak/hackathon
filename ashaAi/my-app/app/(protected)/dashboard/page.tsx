"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { LineChart, AreaChart } from "@tremor/react"
import { Bell, Stethoscope, Activity, AlertCircle, HeartPulse } from 'lucide-react'

const mockVitalData = [
  { time: '00:00', bp: 120 },
  { time: '04:00', bp: 135 },
  { time: '08:00', bp: 142 },
  { time: '12:00', bp: 138 },
  { time: '16:00', bp: 128 },
  { time: '20:00', bp: 125 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Emergency Alert Section */}
      <Alert variant="destructive" className="animate-pulse">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Emergency Alert!</AlertTitle>
        <AlertDescription>
          <div className="flex items-center justify-between">
            <span>High BP Alert: Patient #123 (BP: 142/90)</span>
            <Button variant="secondary" size="sm" className="ml-4">
              <Bell className="mr-2 h-4 w-4" />
              Contact Nearest Hospital
            </Button>
          </div>
        </AlertDescription>
      </Alert>

      {/* Key Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Response Efficiency</CardTitle>
              <Activity className="h-6 w-6 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">50% Faster</div>
            <p className="text-sm text-muted-foreground mt-2">
              Compared to last quarter
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Risk Reduction</CardTitle>
              <HeartPulse className="h-6 w-6 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">30% Reduced</div>
            <p className="text-sm text-muted-foreground mt-2">
              Maternal health risks
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Patient Vitals Visualization */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Patient Vitals Trend</h3>
        <div className="h-[300px]">
          <AreaChart
            className="h-full mt-4"
            data={mockVitalData}
            categories={["bp"]}
            index="time"
            colors={["rose"]}
            showLegend={false}
            valueFormatter={(value) => `${value} mmHg`}
            curveType="natural"
            yAxisWidth={60}
            customTooltip={({ payload, active }) => {
              if (!active || !payload) return null
              return (
                <div className="bg-background border rounded-lg p-4 shadow-sm">
                  <p className="text-sm font-medium">{payload[0].payload.time}</p>
                  <p className="text-rose-500 text-sm">
                    BP: {payload[0].value} mmHg
                  </p>
                </div>
              )
            }}
          />
        </div>
      </Card>

      {/* Quick Actions Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        <Button className="h-24 flex flex-col items-center justify-center gap-2 hover:bg-primary/90">
          <Stethoscope className="h-8 w-8" />
          <span className="font-medium">New Consultation</span>
        </Button>
        
        <Button variant="secondary" className="h-24 flex flex-col items-center justify-center gap-2">
          <Activity className="h-8 w-8" />
          <span className="font-medium">Check Symptoms</span>
        </Button>
        
        <Button className="h-24 flex flex-col items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600">
          <AlertCircle className="h-8 w-8" />
          <span className="font-medium">IoT Alerts</span>
        </Button>
      </div>
    </div>
  )
}