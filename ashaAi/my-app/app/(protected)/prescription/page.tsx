"use client"

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { FileText, Stethoscope, Loader2, X } from 'lucide-react'

export default function MedicalRAG() {
  const [files, setFiles] = useState<File[]>([])
  const [messages, setMessages] = useState<Array<{role: string, content: string}>>([])
  const [input, setInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/pdf': ['.pdf']
    },
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles])
    }
  })

  const removeFile = (index: number) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }])
    setInput('')
    
    // Simulate AI response
    setIsProcessing(true)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: 'Based on the uploaded prescription, the patient should take 500mg Amoxicillin every 8 hours for 7 days. Avoid alcohol consumption during treatment.'
      }])
      setIsProcessing(false)
    }, 1500)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-160px)]">
      {/* Left Panel - Document Upload & Preview */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Medical Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Document Drop Zone */}
            <div
              {...getRootProps()}
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50"
            >
              <input {...getInputProps()} />
              <p className="text-muted-foreground">
                Drag prescription or medical reports here, or click to upload
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Supported formats: PDF, JPG, PNG
              </p>
            </div>

            {/* Uploaded Files List */}
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm truncate">{file.name}</span>
                      <Badge variant="outline">{file.type.split('/')[1]}</Badge>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(index)}
                      className="h-6 w-6"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Document Preview */}
            {files.length > 0 && (
              <div className="border rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Extracted Information</h3>
                <ScrollArea className="h-48 p-2 bg-background rounded">
                  <p className="text-sm text-muted-foreground">
                    Patient: John Doe | Age: 35 | Diagnosis: Bacterial Infection<br />
                    Medications: Amoxicillin 500mg<br />
                    Instructions: Take 3 times daily after meals<br />
                    Duration: 7 days<br />
                    Doctor: Dr. Anika Sharma<br />
                    Date: 2024-03-20
                  </p>
                </ScrollArea>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - AI Doctor Chat */}
      <div className="lg:col-span-2 flex flex-col gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5" />
              AI Medical Assistant
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col">
            <ScrollArea className="flex-1 pr-4 mb-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted border'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.role === 'ai' && (
                          <Badge variant="secondary" className="gap-1">
                            <Stethoscope className="w-3 h-3" />
                            AI Doctor
                          </Badge>
                        )}
                        <span className="text-xs opacity-70">
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing documents...
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Chat Input */}
            <form onSubmit={handleSubmit} className="border-t pt-4">
              <div className="relative">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about your prescription, dosage, or medical report..."
                  className="pr-24"
                  disabled={files.length === 0}
                />
                <div className="absolute right-2 top-2 flex gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={files.length === 0}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Attach More
                  </Button>
                  <Button 
                    type="submit" 
                    size="sm" 
                    disabled={!input.trim() || files.length === 0}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}