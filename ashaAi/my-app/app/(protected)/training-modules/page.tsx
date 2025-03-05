"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from 'react'
import { Laptop, Server, Plug, BookOpenCheck } from 'lucide-react'

export default function TrainingModule() {
  const [connectedDevice, setConnectedDevice] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  const onDragEnd = (result: any) => {
    if (!result.destination) return
    if (result.destination.droppableId === 'hub-dropzone') {
      setConnectedDevice(true)
    }
  }

  const handleQuizSubmit = () => {
    setQuizSubmitted(true)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Left Column - Progress & Badges */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpenCheck className="w-5 h-5" />
              Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Course Completion</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Earned Badges</h3>
              <div className="flex gap-2 flex-wrap">
                <Badge className="gap-2 bg-blue-100 text-blue-800">
                  <Server className="w-4 h-4" />
                  IoT Repair Level 1
                </Badge>
                <Badge className="gap-2 bg-green-100 text-green-800">
                  <Laptop className="w-4 h-4" />
                  Kubernetes Basics
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Section */}
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Check</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="font-medium">What does Kubernetes manage?</p>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-3 rounded border hover:bg-accent">
                <input 
                  type="radio" 
                  name="quiz" 
                  value="A"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                A) Containers
              </label>
              
              <label className="flex items-center gap-2 p-3 rounded border hover:bg-accent">
                <input 
                  type="radio" 
                  name="quiz" 
                  value="B"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                B) Networks
              </label>
              
              <label className="flex items-center gap-2 p-3 rounded border hover:bg-accent">
                <input 
                  type="radio" 
                  name="quiz" 
                  value="C"
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                C) Both
              </label>
            </div>
            
            <Button 
              onClick={handleQuizSubmit}
              disabled={!selectedAnswer}
            >
              Submit Answer
            </Button>

            {quizSubmitted && (
              <div className={`p-3 rounded ${selectedAnswer === 'C' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {selectedAnswer === 'C' 
                  ? '✓ Correct! Kubernetes manages both containers and networks'
                  : '✗ Incorrect. The correct answer is C) Both'}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Interactive Tutorial */}
      <Card>
        <CardHeader>
          <CardTitle>Hands-on Practice: Connect IoT Device</CardTitle>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-2 gap-4 h-[400px]">
              <Droppable droppableId="devices">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="border-2 border-dashed rounded p-4 flex items-center justify-center"
                  >
                    <Draggable draggableId="sensor" index={0}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-blue-100 p-4 rounded flex items-center gap-2 cursor-move"
                        >
                          <Plug className="w-5 h-5 text-blue-800" />
                          <span>IoT Sensor</span>
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

              <Droppable droppableId="hub-dropzone">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`border-2 ${connectedDevice ? 'border-green-500 bg-green-50' : 'border-dashed'} rounded p-4 flex flex-col items-center justify-center`}
                  >
                    {connectedDevice ? (
                      <>
                        <Server className="w-8 h-8 text-green-500" />
                        <p className="mt-2 text-green-800">Device Connected!</p>
                      </>
                    ) : (
                      <p className="text-muted-foreground">Drag sensor here to connect</p>
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
          
          <div className="mt-4 text-sm text-muted-foreground">
            Practice connecting IoT devices by dragging the sensor to the hub
          </div>
        </CardContent>
      </Card>
    </div>
  )
}