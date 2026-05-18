import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Phone, Gift, ShoppingBag, Truck, CreditCard, Mail, Compass, Home, ChevronLeft, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import logoSrc from "@assets/rossy logo.png";


type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const SUGGESTED_QUESTIONS = [
  {
    question: "What do you sell?",
    icon: <ShoppingBag className="h-4 w-4" />,
  },
  {
    question: "Where do you deliver?",
    icon: <Truck className="h-4 w-4" />,
  },
  {
    question: "How can I pay?",
    icon: <CreditCard className="h-4 w-4" />,
  },
  {
    question: "Contact details",
    icon: <Phone className="h-4 w-4" />,
  },
];

const KNOWLEDGE_BASE = [
  {
    keywords: ["him", "men", "man", "boyfriend", "husband", "father", "dad", "guy", "male", "groom", "mens", "boy"],
    answer: "We have an amazing 'Gifts for Him' collection! It includes premium watches, wallets, perfumes (like Azzaro, Chanel, Dior, Versace), grooming sets, and more. Check out our 'Gifts For Him' category in the Collection.",
  },
  {
    keywords: ["her", "women", "woman", "girlfriend", "wife", "mother", "mom", "lady", "girl", "bride", "womens", "mum"],
    answer: "For the special ladies, we offer luxury 'Gifts for Her' including fine jewelry, premium perfumes, spa & skincare pamper boxes, and elegant satin gift sets. Browse our 'Gifts For Her' category!",
  },
  {
    keywords: ["sobolo", "drink", "bissap", "beverage", "refreshment", "juice"],
    answer: "Yes! We make rich, refreshing homemade Sobolo (Bissap). Quality ingredients, crafted with love. Check out our 'Sobolo Making' page to see our special preparations.",
  },
  {
    keywords: ["package", "packaging", "wrap", "wrapping", "box", "hamper", "corporate", "bulk", "custom"],
    answer: "We provide premium packaging services and customized hampers for corporate events, weddings, anniversaries, and graduations. Visit our 'Packaging Portfolio' page or chat with our Gifting Expert on WhatsApp for custom orders.",
  },
  {
    keywords: ["deliver", "delivery", "shipping", "send", "location", "accra", "where"],
    answer: "We offer swift and secure delivery services across Accra. Delivery fees may apply depending on your exact location. We also offer a Pickup option at checkout!",
  },
  {
    keywords: ["pay", "payment", "cost", "price", "money", "card", "momo", "paystack"],
    answer: "You can pay securely online via Paystack (which accepts Cards and Mobile Money), or you can choose the Pickup option if you prefer to pay upon collection.",
  },
  {
    keywords: ["contact", "phone", "whatsapp", "call", "email", "tiktok", "reach", "number"],
    answer: "You can reach us directly on WhatsApp at +233 55 819 8832, via email at okangrosemond490@gmail.com, or check out our TikTok @rossys.enterprise.",
  },
  {
    keywords: ["perfume", "fragrance", "scent", "cologne", "smell", "spray"],
    answer: "We carry a wide variety of premium authentic perfumes for both men and women, including brands like Chanel, Dior Sauvage, Versace, Gucci, Valentino, Hugo Boss, and Azzaro. Check the Perfume categories in our Collection!",
  },
  {
    keywords: ["jewelry", "necklace", "earring", "ring", "gold", "silver", "pendant"],
    answer: "We have beautiful luxury jewelry pieces including gold necklaces, pendants, and earring sets. Browse the 'Jewelery' category in our Collection.",
  },
  {
    keywords: ["card", "cards", "birthday", "sympathy", "thank you", "congratulation", "anniversary", "greeting"],
    answer: "We offer a wide variety of greeting cards for every occasion: Birthdays, Anniversaries, Congratulations, Sympathy, Thank You, and more. Add a thoughtful card to your gift package!",
  },
  {
    keywords: ["valentine", "love", "romantic", "romance", "rose", "teddy", "bear"],
    answer: "Looking for something romantic? We have a special Valentine's Day and Romance collection featuring giant red teddy bears, heart boxes, red roses, and chocolates.",
  },
  {
    keywords: ["ramadan", "iftar", "fasting", "muslim", "eid", "islamic", "fruit", "snack"],
    answer: "For Ramadan, we offer specialized Fresh Fruits Iftar Baskets, Premium Snack & Nuts Baskets, and Halal treats perfect for breaking the fast or gifting during Eid.",
  },
  {
    keywords: ["what do you sell", "products", "items", "shop", "store", "buy", "offer"],
    answer: "We offer a curated selection of premium gifts, hampers, jewelry, perfumes, bath & body sets, greeting cards, and special occasion items. We also make homemade Sobolo! Check our Collection page for more.",
  },
  {
    keywords: ["navigation", "links", "pages", "categories"],
    answer: "Here are the quick links to our main pages:\n• [Home](/)\n• [All Categories](/categories)\n• [Full Collection](/collection)\n• [Your Cart & Checkout](/checkout)\n• [Sobolo Making](/sobolo)",
  },
  {
    keywords: ["hi", "hello", "hey", "greetings"],
    answer: "Hello there! How can I assist you with your gifting needs today? Feel free to ask about our gifts for men/women, delivery, or custom hampers.",
  },
  {
    keywords: ["thanks", "thank you", "thx", "appreciate"],
    answer: "You're very welcome! Let me know if there's anything else I can help you with.",
  },
  {
    keywords: ["yes", "okay", "ok", "sure", "alright", "yep", "yeah", "chat", "personnel", "vendor"],
    answer: "Great! You can [Chat with our Gifting Expert on WhatsApp](https://wa.me/233558198832) right away to place a custom order or ask any specific questions!",
  }
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "history" | "chat">("home");
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
    if (!isOpen) {
      setCurrentView("home");
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, currentView]);

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
      let response = "I'm sorry, I don't have information on that yet. Would you like to [Chat with our Gifting Expert on WhatsApp](https://wa.me/233558198832) for more help?";
      
      const words = lowerText.split(/\s+/).map(w => w.replace(/[^\w]/g, ''));
      let bestMatch = null;
      let highestScore = 0;

      KNOWLEDGE_BASE.forEach(kb => {
        let score = 0;
        kb.keywords.forEach(kw => {
          if (words.includes(kw)) score += 3;
          else if (lowerText.includes(kw)) score += 1;
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = kb;
        }
      });

      if (bestMatch && highestScore > 0) {
        response = bestMatch.answer;
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
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.25); opacity: 0.4; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes beep-glow {
          0%, 100% { opacity: 0.9; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        .pulse-ring-element {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .beep-glow-element {
          animation: beep-glow 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Floating Button Container */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* "Talk to me" text with pulsing / beeping active indicator */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="beep-glow-element relative flex items-center gap-2 rounded-full border border-primary/20 bg-background/95 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-primary shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Talk to me
            {/* Arrow tail */}
            <div className="absolute right-[-6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-primary/20 bg-background"></div>
          </motion.div>
        )}

        {/* 3D Button Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "relative flex h-16 w-16 items-center justify-center rounded-full transition-all duration-150 select-none cursor-pointer focus:outline-none",
            isOpen 
              ? "bg-foreground text-background border-2 border-foreground/30 shadow-[0_4px_0_#222,0_10px_20px_rgba(0,0,0,0.3)] active:translate-y-[4px] active:shadow-[0_0px_0_#222,0_4px_10px_rgba(0,0,0,0.3)]" 
              : "bg-white border-2 border-yellow-500/50 shadow-[0_6px_0_#d4af37,0_12px_24px_rgba(0,0,0,0.25)] hover:translate-y-[2px] hover:shadow-[0_4px_0_#d4af37,0_8px_16px_rgba(0,0,0,0.25)] active:translate-y-[6px] active:shadow-[0_0px_0_#d4af37,0_4px_8px_rgba(0,0,0,0.25)]"
          )}
          aria-label="Toggle chat"
        >
          {/* Pulsing ring around button */}
          {!isOpen && (
            <div className="pulse-ring-element absolute inset-0 rounded-full bg-yellow-400/30" />
          )}

          {isOpen ? (
            <X className="h-7 w-7 text-white" />
          ) : (
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-yellow-500/20 bg-white p-0.5 shadow-inner">
              <img 
                src={logoSrc} 
                alt="Rossy's Logo" 
                className="h-full w-full object-contain"
              />
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 flex h-[550px] w-[350px] flex-col overflow-hidden border border-white/20 bg-background shadow-2xl backdrop-blur-xl md:w-[400px]"
          >
            {/* 1. Home View */}
            {currentView === "home" && (
              <div className="relative flex flex-col h-full bg-background text-foreground select-none">
                {/* Close Button */}
                <div className="flex justify-end p-4 z-10">
                  <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100 transition-opacity">
                    <X className="h-6 w-6 text-foreground" />
                  </button>
                </div>

                {/* Big watermark logo background */}
                <div className="absolute inset-0 top-12 flex items-center justify-center pointer-events-none z-0 opacity-[0.12]">
                  <img src={logoSrc} alt="Rossy Logo Watermark" className="w-56 h-56 object-contain" />
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center px-6 z-10 text-center pb-8">
                  <h2 className="text-xl md:text-2xl font-bold font-serif mb-4 leading-snug text-foreground">
                    We are live and ready to chat with you now.
                  </h2>
                  <p className="text-sm font-light text-muted-foreground">
                    Say something to start a live chat.
                  </p>
                </div>

                {/* New Conversation Card */}
                <div className="px-6 z-10 mb-8">
                  <button
                    onClick={() => {
                      setMessages([
                        {
                          id: Date.now().toString(),
                          text: "Hello! I'm Rossy's Assistant. How can I help you today?",
                          sender: "bot",
                          timestamp: new Date(),
                        }
                      ]);
                      setCurrentView("chat");
                    }}
                    className="w-full flex items-center justify-between rounded-2xl bg-card p-5 text-left shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-border"
                  >
                    <div>
                      <h3 className="text-base font-bold text-foreground font-sans">New Conversation</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">We typically reply in a few minutes</p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Send className="h-5 w-5 transform rotate-45 text-primary" />
                    </div>
                  </button>
                </div>

                {/* Bottom Navigation */}
                <div className="border-t border-border bg-card py-3 px-8 flex justify-around items-center z-10">
                  <button 
                    onClick={() => setCurrentView("home")}
                    className="flex flex-col items-center gap-1 text-primary hover:text-primary transition-colors"
                  >
                    <Home className="h-5 w-5 text-primary" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Home</span>
                  </button>
                  <button 
                    onClick={() => setCurrentView("history")}
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Messages</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. History / Messages View */}
            {currentView === "history" && (
              <div className="flex flex-col h-full bg-background text-foreground select-none">
                {/* Header */}
                <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-white" />
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white">Messages</h3>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100">
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>

                {/* Body Contents */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                  {/* Start a new chat */}
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Start a new chat</h4>
                    <button
                      onClick={() => {
                        setMessages([
                          {
                            id: Date.now().toString(),
                            text: "Hello! I'm Rossy's Assistant. How can I help you today?",
                            sender: "bot",
                            timestamp: new Date(),
                          }
                        ]);
                        setCurrentView("chat");
                      }}
                      className="w-full flex items-center justify-between rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all duration-200 hover:border-primary/30 hover:scale-[1.01]"
                    >
                      <div>
                        <h5 className="text-sm font-bold text-foreground">New Conversation</h5>
                        <p className="text-xs text-muted-foreground mt-0.5">We typically reply in a few minutes</p>
                      </div>
                      <Send className="h-4 w-4 text-primary transform rotate-45" />
                    </button>
                  </div>

                  {/* Recent Conversations */}
                  <div>
                    <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">Recent</h4>
                    {messages.length > 1 ? (
                      <button
                        onClick={() => setCurrentView("chat")}
                        className="w-full flex items-center justify-between rounded-xl bg-muted/30 hover:bg-muted/60 p-4 text-left border border-border/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0 pr-3">
                          <h5 className="text-sm font-bold text-foreground">Customer Support</h5>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {messages[messages.length - 1].sender === "user" ? "You: " : ""}
                            {messages[messages.length - 1].text}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-muted-foreground">now</span>
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                            1
                          </span>
                          <ChevronLeft className="h-4 w-4 text-muted-foreground transform rotate-180" />
                        </div>
                      </button>
                    ) : (
                      <div className="text-center py-6 border border-dashed border-border rounded-xl">
                        <p className="text-xs text-muted-foreground font-sans">No recent conversations.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Navigation */}
                <div className="border-t border-border bg-background py-3 px-8 flex justify-around items-center">
                  <button 
                    onClick={() => setCurrentView("home")}
                    className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">Home</span>
                  </button>
                  <button 
                    onClick={() => setCurrentView("history")}
                    className="flex flex-col items-center gap-1 text-primary hover:text-primary transition-colors"
                  >
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <span className="text-[9px] font-bold uppercase tracking-wider text-primary">Messages</span>
                  </button>
                </div>
              </div>
            )}

            {/* 3. Chat View */}
            {currentView === "chat" && (
              <div className="flex flex-col h-full bg-background text-foreground">
                {/* Header */}
                <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setCurrentView("history")} 
                      className="flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity mr-1"
                    >
                      <ChevronLeft className="h-5 w-5 text-white" />
                      <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline text-white">Back</span>
                    </button>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      <MessageCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-white">Rossy's Assistant</h3>
                      <p className="text-[10px] opacity-80 text-white">Always here to help</p>
                    </div>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100">
                    <X className="h-5 w-5 text-white" />
                  </button>
                </div>

                {/* Messages Area */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/20 bg-background"
                >
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, x: msg.sender === "user" ? 10 : -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={cn(
                        "flex flex-col max-w-[85%] space-y-1",
                        msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-2xl px-4 py-2 text-sm shadow-sm leading-relaxed",
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
                      <span className="text-[10px] text-muted-foreground px-1 font-sans">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </motion.div>
                  ))}

                  {/* Suggestions */}
                  {messages.length === 1 && (
                    <div className="grid grid-cols-1 gap-2 pt-2 select-none">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Common Questions</p>
                      {SUGGESTED_QUESTIONS.map((item) => (
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
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground text-foreground"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim()}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105 disabled:opacity-50"
                    >
                      <Send className="h-4 w-4 text-white" />
                    </button>
                  </form>
                </div>

                {/* Footer */}
                <div className="px-4 py-2 border-t border-border bg-muted/30 flex items-center justify-between select-none">
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
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
