import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Mic, Video, PhoneOff, Zap } from 'lucide-react'

const mockMessages = [
  { user: 'Doctor', text: 'Can you show me the wound area?', time: '10:15 AM' },
  { user: 'ASHA', text: 'Yes, adjusting camera now', time: '10:15 AM' },
]

export default function VideoConsultation() {
  return (
    <div className="flex h-[calc(100vh-180px)] gap-4">
      {/* Left Panel - Video & Chat */}
      <div className="flex-1 flex flex-col gap-4">
        <Card className="relative aspect-video bg-black border-none">
          <div className="absolute top-2 left-2 bg-background/80 px-3 py-1 rounded-full flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm">5G Connected</span>
          </div>
          <video className="h-full w-full rounded-lg" controls>
            <source src="/asha-mock-video.mp4" type="video/mp4" />
          </video>
        </Card>

        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle>Consultation Chat</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col">
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {mockMessages.map((message, index) => (
                  <div key={index} className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{message.user[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{message.user}</span>
                        <span className="text-xs text-muted-foreground">
                          {message.time}
                        </span>
                      </div>
                      <p className="mt-1 text-sm bg-muted/50 rounded-lg p-3">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="pt-4 flex gap-2">
              <Input placeholder="Type message..." className="flex-1" />
              <Button variant="secondary">Send</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Doctor Profile & Controls */}
      <div className="w-80 flex flex-col gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <Avatar className="h-16 w-16 mx-auto mb-4">
              <AvatarImage src="/doctor-avatar.png" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <h3 className="font-semibold">Dr. Anika Sharma</h3>
            <p className="text-sm text-muted-foreground">General Physician</p>
            <p className="text-sm mt-2">AIIMS Guwahati</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Call Controls</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center gap-4">
            <Button variant="outline" className="rounded-full h-14 w-14">
              <Mic className="h-6 w-6" />
            </Button>
            <Button 
              variant="destructive" 
              className="rounded-full h-14 w-14"
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
            <Button variant="outline" className="rounded-full h-14 w-14">
              <Video className="h-6 w-6" />
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vital Monitoring</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Heart Rate</span>
              <span className="font-mono">78 BPM</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Blood Pressure</span>
              <span className="font-mono">120/80 mmHg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Oxygen</span>
              <span className="font-mono">98%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}