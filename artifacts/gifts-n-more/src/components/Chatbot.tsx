import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, Gift, ShoppingBag, Truck, CreditCard, Mail, Compass } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Link } from "wouter";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const KNOWLEDGE_BASE = [
  {
    question: "What do you sell?",
    answer: "We offer a curated selection of gifts, hampers, jewelry, perfumes, bath & body sets, and special occasion items. Check our Collection for more!",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    question: "Where do you deliver?",
    answer: "We provide swift and secure delivery services to your loved ones across Accra. Delivery fees may apply based on location.",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    question: "How can I pay?",
    answer: "You can pay online via Paystack (Cards, Mobile Money) or choose the Pickup option to pay at our location.",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    question: "Custom hampers?",
    answer: "Yes! We specialize in corporate gifting and customized hampers for weddings, anniversaries, and more.",
    icon: <Gift className="h-4 w-4" />,
  },
  {
    question: "Contact details",
    answer: "WhatsApp: +233 55 819 8832\nEmail: okangrosemond490@gmail.com\nTikTok: @rossys.enterprise",
    icon: <Phone className="h-4 w-4" />,
  },
  {
    question: "Site Navigation",
    answer: "Here are the quick links to our main pages:\n• [Home](/)\n• [All Categories](/categories)\n• [Full Collection](/collection)\n• [Your Cart & Checkout](/checkout)\n• [Sobolo Making](/sobolo)",
    icon: <Compass className="h-4 w-4" />,
  },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Rossy's Assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simple bot logic
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let response = "I'm sorry, I don't have information on that yet. Would you like to chat with our gifting expert on WhatsApp?";
      
      const found = KNOWLEDGE_BASE.find(k => 
        lowerText.includes(k.question.toLowerCase()) || 
        k.question.toLowerCase().includes(lowerText) ||
        (k.answer.toLowerCase().includes(lowerText) && lowerText.length > 3)
      );

      if (found) {
        response = found.answer;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110",
          isOpen ? "bg-foreground text-background" : "bg-primary text-primary-foreground"
        )}
        aria-label="Toggle chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[350px] flex-col overflow-hidden border border-white/20 bg-background/80 shadow-2xl backdrop-blur-xl md:w-[400px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <MessageCircle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest">Rossy's Assistant</h3>
                  <p className="text-[10px] opacity-80">Always here to help</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20"
            >
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === "user" ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex flex-col max-w-[80%] space-y-1",
                    msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2 text-sm shadow-sm",
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted text-foreground rounded-tl-none border border-border/50"
                    )}
                  >
                    {msg.text.split('\n').map((line, i) => {
                      const parts = line.split(/\[([^\]]+)\]\(([^)]+)\)/g);
                      if (parts.length === 1) return <p key={i}>{line}</p>;
                      
                      return (
                        <p key={i}>
                          {parts.map((part, j) => {
                            if (j % 3 === 1) {
                              const url = parts[j + 1];
                              const isInternal = url.startsWith('/');
                              if (isInternal) {
                                return (
                                  <Link key={j} href={url} onClick={() => setIsOpen(false)} className="underline font-semibold text-primary hover:text-primary/80">
                                    {part}
                                  </Link>
                                );
                              }
                              return (
                                <a key={j} href={url} target="_blank" rel="noreferrer" className="underline font-semibold text-primary hover:text-primary/80">
                                  {part}
                                </a>
                              );
                            } else if (j % 3 === 2) {
                              return null;
                            }
                            return <span key={j}>{part}</span>;
                          })}
                        </p>
                      );
                    })}
                  </div>
                  <span className="text-[10px] text-muted-foreground px-1">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </motion.div>
              ))}

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="grid grid-cols-1 gap-2 pt-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Common Questions</p>
                  {KNOWLEDGE_BASE.map((item) => (
                    <button
                      key={item.question}
                      onClick={() => handleSend(item.question)}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background/50 p-2 text-left text-xs transition-colors hover:bg-primary/5 hover:border-primary/30"
                    >
                      <span className="text-primary">{item.icon}</span>
                      {item.question}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4 bg-background/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center justify-between">
              <div className="flex gap-2">
                <a href="https://wa.me/233558198832" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Phone className="h-3 w-3" />
                </a>
                <a href="mailto:okangrosemond490@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="h-3 w-3" />
                </a>
              </div>
              <span className="text-[8px] uppercase tracking-widest text-muted-foreground font-bold">Rossy's Enterprise</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
