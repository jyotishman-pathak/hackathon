"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Mic, Stethoscope, Save } from 'lucide-react'

const mockConversation = [
  {
    role: 'user',
    content: 'Severe stomach pain, vomiting',
    timestamp: '10:15 AM'
  },
  {
    role: 'ai',
    content: 'Risk of Appendicitis (87%). Urgent consultation recommended.',
    timestamp: '10:16 AM'
  }
]

export default function SymptomChecker() {
  const [messages, setMessages] = useState(mockConversation)
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState('')

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = SpeechRecognition ? new SpeechRecognition() : null

  useEffect(() => {
    if (!recognition) {
      setError('Speech recognition not supported in this browser')
      return
    }

    recognition.lang = 'en-US, as-IN'
    recognition.continuous = false
    recognition.interimResults = false

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(prev => prev + ' ' + transcript)
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
      setError('Error occurred in speech recognition')
    }

    return () => recognition.abort()
  }, [])

  const startListening = () => {
    if (recognition) {
      setIsListening(true)
      recognition.start()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const newMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    
    setMessages(prev => [...prev, newMessage])
    setInput('')

    // Here you would typically call your Gemini API
    // Then add AI response to messages
  }

  return (
    <Card className="h-[calc(100vh-180px)] flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Stethoscope className="h-6 w-6 text-primary" />
          AI Symptom Checker
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        <ScrollArea className="flex-1 rounded-lg border p-4 bg-muted/10">
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
                      : 'bg-background border'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe symptoms in Assamese or English / লক্ষণবোৰ অসমীয়া বা ইংৰাজীত বৰ্ণনা কৰক"
              className="pr-12 min-h-[100px]"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={startListening}
              disabled={!recognition || isListening}
              className="absolute top-2 right-2"
            >
              <Mic className={`h-5 w-5 ${isListening ? 'text-red-500 animate-pulse' : ''}`} />
            </Button>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2 justify-end">
            <Button type="submit" className="gap-2">
              Analyze Symptoms
            </Button>
          </div>
        </form>

        <div className="flex gap-4 justify-end border-t pt-4">
          <Button variant="outline" className="gap-2">
            <Save className="h-4 w-4" />
            Save to Patient Record
          </Button>
          <Button className="gap-2 bg-green-600 hover:bg-green-700">
            <Stethoscope className="h-4 w-4" />
            Connect to Doctor
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}