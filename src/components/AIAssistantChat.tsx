import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Bot, User, Phone, CheckCircle2, Clock } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AIAssistantChatProps {
  vetId: string;
  onBack: () => void;
}

interface Message {
  id: string;
  type: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

const AIAssistantChat = ({ vetId, onBack }: AIAssistantChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "El veterinario ha sido notificado y se pondrá en contacto contigo pronto.",
      timestamp: new Date(),
    },
    {
      id: "2",
      type: "assistant",
      content: "Hola, soy tu asistente de IA. Mientras esperas al veterinario, puedo ayudarte con información y orientación. ¿Puedes describirme los síntomas de tu mascota con más detalle?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Entiendo. Ese síntoma puede tener varias causas. ¿Tu mascota ha comido algo inusual recientemente?",
        "Es importante mantener la calma. Mientras esperamos al veterinario, asegúrate de que tu mascota tenga acceso a agua fresca.",
        "Basándome en lo que me cuentas, es bueno que hayas solicitado atención veterinaria. ¿Hay algún cambio en el comportamiento de tu mascota?",
        "Recuerda anotar todos los síntomas que observes. Esta información será muy útil para el veterinario.",
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-card border-b sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={onBack} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Button>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold">Dra. María González</p>
                <div className="flex items-center gap-1 text-sm text-success">
                  <Clock className="w-3 h-3" />
                  <span>Llegada estimada: 3-5 min</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="w-5 h-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 py-6 max-w-4xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              } ${message.type === "system" ? "justify-center" : ""}`}
            >
              {message.type === "system" ? (
                <div className="max-w-md p-4 rounded-lg bg-primary/5 border border-primary/20 text-center">
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-medium">{message.content}</span>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.type === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-md p-4 rounded-2xl ${
                      message.type === "user"
                        ? "bg-accent text-accent-foreground rounded-tr-none"
                        : "bg-card border shadow-sm rounded-tl-none"
                    }`}
                  >
                    <p className="text-sm md:text-base">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.type === "user" ? "text-accent-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-card border shadow-sm p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-card border-t shadow-lg">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-primary hover:bg-primary/90"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Este asistente proporciona orientación general. No reemplaza el diagnóstico veterinario profesional.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantChat;
