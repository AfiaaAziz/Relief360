import React, { useState, useEffect } from "react";
import { Users, Hospital, MapPin, Phone, MessageCircle, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "../assets/images/HeroImage.jpg";
import slider1 from "../assets/images/slider1.jpg";
import slider2 from "../assets/images/slider2.jpg";
import slider3 from "../assets/images/slider3.jpg";
import slider4 from "../assets/images/slider4.jpg";
import slider5 from "../assets/images/slider5.jpg";
import "../styles/theme.css";

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 whitespace-nowrap";

  const variants = {
    default: "text-white hover:scale-105 shadow-lg transition-all duration-300",
    secondary: "text-white hover:scale-105 shadow-lg transition-all duration-300",
    hero: "text-white hover:scale-105 shadow-lg transition-all duration-300",
  };

  const sizes = {
    default: "h-8 px-3 text-xs",
    lg: "h-12 px-8 text-lg",
  };

  const getButtonStyle = () => {
    switch(variant) {
      case 'hero':
        return { background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)' };
      case 'secondary':
        return { background: 'linear-gradient(135deg, #16537e 0%, #38761d 100%)' };
      default:
        return { background: 'linear-gradient(135deg, #16537e 0%, #6aa84f 100%)' };
    }
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      style={getButtonStyle()}
      {...props}
    >
      {children}
    </button>
  );
};

const Home = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showBotMessage, setShowBotMessage] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider images array
  const sliderImages = [heroImage, slider1, slider2, slider3, slider4, slider5];

  // Auto-rotate slider every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // Navigation functions
  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isChatOpen && window.botpressWebChat) {
      window.botpressWebChat.init({
        composerPlaceholder: "Type your message...",
        botId: "YOUR_BOT_ID",
        hostUrl: "https://cdn.botpress.cloud/webchat/v1",
        messagingUrl: "https://messaging.botpress.cloud",
        clientId: "YOUR_CLIENT_ID",
        container: "#bp-webchat-container",
      });
    }
  }, [isChatOpen]);

  // Auto-hide message after 8 seconds
  useEffect(() => {
    if (showBotMessage && !isChatOpen) {
      const timer = setTimeout(() => {
        setShowBotMessage(false);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [showBotMessage, isChatOpen]);

  return (
    <section 
      className="relative flex flex-col"
      style={{
        background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.3) 0%, rgba(56, 118, 29, 0.2) 50%, rgba(106, 168, 79, 0.25) 100%)',
        height: '100vh',
        maxHeight: '100vh',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%'
      }}
    >
      {/* Image Slider Background */}
      <div className="absolute inset-0">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              filter: 'blur(0.5px)',
              WebkitFilter: 'blur(0.5px)',
              background: 'linear-gradient(135deg, rgba(22, 83, 126, 0.3) 0%, rgba(56, 118, 29, 0.2) 50%, rgba(106, 168, 79, 0.25) 100%)'
            }}
          >
            <img
              src={image}
              alt={`Slider ${index + 1}`}
              style={{
                opacity: 0.75,
                objectFit: 'cover',
                objectPosition: 'center',
                width: '100%',
                height: '100%',
                minWidth: '100%',
                minHeight: '100%',
                imageRendering: 'auto',
                WebkitImageRendering: 'auto'
              }}
            />
          </div>
        ))}
        
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, rgba(153, 0, 0, 0.8) 0%, rgba(244, 67, 54, 0.8) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(153, 0, 0, 0.5)'
          }}
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, rgba(153, 0, 0, 0.8) 0%, rgba(244, 67, 54, 0.8) 100%)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(153, 0, 0, 0.5)'
          }}
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Dots Indicator - Bottom Center */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
          {sliderImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="transition-all duration-300 rounded-full hover:scale-125"
              style={{
                width: index === currentSlide ? '12px' : '8px',
                height: index === currentSlide ? '12px' : '8px',
                background: index === currentSlide 
                  ? 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)'
                  : 'rgba(255, 255, 255, 0.5)',
                boxShadow: index === currentSlide 
                  ? '0 0 10px rgba(255, 53, 53, 0.8)'
                  : '0 0 5px rgba(255, 255, 255, 0.3)'
              }}
            />
          ))}
        </div>
      </div>

       {/* Main Content Container */}
       <div className="relative z-10 flex-1 flex flex-col min-h-0 overflow-hidden">
         
         {/* Content Area - Takes available space but leaves room for footer */}
         <div className="flex-1 flex items-center justify-center px-4 py-1 min-h-0 overflow-hidden">
           <div className="text-center max-w-4xl mx-auto w-full">
             
             {/* Title */}
             <h1 
               className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-6"
               style={{
                 color: '#ffffff',
                 textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 2px 10px rgba(153, 0, 0, 0.6), 0 0 30px rgba(255, 255, 255, 0.3)',
                 WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)'
               }}
             >
               Relief - 360
             </h1>

             {/* Subtitle */}
             <p 
               className="text-sm md:text-base lg:text-lg text-white max-w-2xl mx-auto font-bold mb-5"
               style={{
                 textShadow: '0 2px 15px rgba(0, 0, 0, 0.9), 0 1px 5px rgba(153, 0, 0, 0.5)',
                 background: 'rgba(0, 0, 0, 0.3)',
                 padding: '8px 16px',
                 borderRadius: '8px',
                 backdropFilter: 'blur(5px)'
               }}
             >
               Connecting citizens, volunteers, hospitals, and emergency responders
               in real-time to save lives and manage disasters effectively.
             </p>

             {/* Action Buttons */}
             <div className="flex flex-row justify-center gap-3 mb-8">
               <Link to="/volunteer-register">
                 <Button variant="secondary" size="lg" className="shadow-2xl text-sm md:text-base">
                   <Users className="h-5 w-5" />
                   Join as Volunteer
                 </Button>
               </Link>
             </div>

             {/* Stats Grid */}
             <div className="grid grid-cols-4 gap-8 md:gap-16 text-center text-white max-w-2xl mx-auto">
               <div 
                 className="p-4 md:p-5 rounded-xl transition-all duration-300 border-2 hover:scale-105 flex flex-col justify-center"
                 style={{
                   background: 'rgba(255, 53, 53, 0.85)',
                   borderColor: '#ff3535',
                   backdropFilter: 'blur(10px)',
                   boxShadow: '0 4px 15px rgba(255, 53, 53, 0.4)'
                 }}
               >
                 <p 
                   className="text-lg md:text-xl font-black mb-2.5"
                   style={{ 
                     color: '#ffffff',
                     textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                   }}
                 >
                   24/7
                 </p>
                 <p 
                   className="text-[12px] md:text-[15px] font-bold text-white"
                   style={{
                     textShadow: '0 1px 5px rgba(0, 0, 0, 0.8)'
                   }}
                 >
                   Emergency
                 </p>
               </div>

               <div 
                 className="p-4 md:p-5 rounded-xl transition-all duration-300 border-2 hover:scale-105 flex flex-col justify-center"
                 style={{
                   background: 'rgba(244, 136, 54, 0.85)',
                   borderColor: '#f48836',
                   backdropFilter: 'blur(10px)',
                   boxShadow: '0 4px 15px rgba(244, 136, 54, 0.4)'
                 }}
               >
                 <p 
                   className="text-lg md:text-xl font-black mb-2.5"
                   style={{ 
                     color: '#ffffff',
                     textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                   }}
                 >
                   1000+
                 </p>
                 <p 
                   className="text-[12px] md:text-[15px] font-bold text-white"
                   style={{
                     textShadow: '0 1px 5px rgba(0, 0, 0, 0.8)'
                   }}
                 >
                   Volunteers
                 </p>
               </div>

               <div 
                 className="p-4 md:p-5 rounded-xl transition-all duration-300 border-2 hover:scale-105 flex flex-col justify-center"
                 style={{
                   background: 'rgba(106, 168, 79, 0.85)',
                   borderColor: '#6aa84f',
                   backdropFilter: 'blur(10px)',
                   boxShadow: '0 4px 15px rgba(106, 168, 79, 0.4)'
                 }}
               >
                 <p 
                   className="text-lg md:text-xl font-black mb-2.5"
                   style={{ 
                     color: '#ffffff',
                     textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                   }}
                 >
                   50+
                 </p>
                 <p 
                   className="text-[12px] md:text-[15px] font-bold text-white"
                   style={{
                     textShadow: '0 1px 5px rgba(0, 0, 0, 0.8)'
                   }}
                 >
                   Hospitals
                 </p>
               </div>

               <div 
                 className="p-4 md:p-5 rounded-xl transition-all duration-300 border-2 hover:scale-105 flex flex-col justify-center"
                 style={{
                   background: 'rgba(22, 83, 126, 0.85)',
                   borderColor: '#16537e',
                   backdropFilter: 'blur(10px)',
                   boxShadow: '0 4px 15px rgba(22, 83, 126, 0.4)'
                 }}
               >
                 <p 
                   className="text-lg md:text-xl font-black mb-2.5"
                   style={{ 
                     color: '#ffffff',
                     textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)'
                   }}
                 >
                   95%
                 </p>
                 <p 
                   className="text-[12px] md:text-[15px] font-bold text-white"
                   style={{
                     textShadow: '0 1px 5px rgba(0, 0, 0, 0.8)'
                   }}
                 >
                   Success
                 </p>
               </div>
             </div>
           </div>
         </div>

         {/* Emergency Footer Bar - Always visible at bottom */}
         <div 
           className="shrink-0 text-white py-3"
           style={{
             background: 'linear-gradient(135deg, rgba(153, 0, 0, 0.95) 0%, rgba(244, 67, 54, 0.95) 100%)'
           }}
         >
           <div className="container mx-auto px-4">
             <div className="flex justify-center gap-4 md:gap-6 text-xs md:text-sm font-bold">
               <a href="tel:911" className="flex items-center gap-1.5 hover:scale-110 transition-transform duration-300">
                 <Phone className="h-4 w-4" />
                 <span>Emergency: 911</span>
               </a>
               <a href="tel:112" className="flex items-center gap-1.5 hover:scale-110 transition-transform duration-300">
                 <Hospital className="h-4 w-4" />
                 <span>Medical: 112</span>
               </a>
               <a href="tel:101" className="flex items-center gap-1.5 hover:scale-110 transition-transform duration-300">
                 <MapPin className="h-4 w-4" />
                 <span>Fire: 101</span>
               </a>
             </div>
           </div>
         </div>
       </div>

       {/* Attractive Bot Message Popup */}
       {!isChatOpen && showBotMessage && (
         <div 
           className="fixed bottom-20 right-4 z-50 max-w-[240px] animate-bounce"
           style={{ 
             animation: 'bounce 2s ease-in-out infinite',
             animationDelay: '1s'
           }}
         >
           <div 
             className="relative p-3 rounded-xl shadow-2xl backdrop-blur-md border-2"
             style={{
               background: 'linear-gradient(135deg, rgba(153, 0, 0, 0.95) 0%, rgba(244, 67, 54, 0.95) 100%)',
               borderColor: '#ff3535',
               boxShadow: '0 8px 25px rgba(153, 0, 0, 0.6)',
               animation: 'pulse 2s ease-in-out infinite'
             }}
           >
             {/* Close button */}
             <button
               onClick={() => setShowBotMessage(false)}
               className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors z-10"
             >
               <X className="h-2.5 w-2.5 text-white" />
             </button>
             
             {/* Message content */}
             <div className="flex items-center gap-2.5 pr-5">
               <div 
                 className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                 style={{
                   background: 'linear-gradient(135deg, #ff3535 0%, #f44336 100%)',
                   boxShadow: '0 0 12px rgba(255, 53, 53, 0.8)',
                   animation: 'pulse 1.5s ease-in-out infinite'
                 }}
               >
                 <MessageCircle className="h-4 w-4 text-white" />
               </div>
               <div className="flex-1">
                 <p className="text-white font-bold text-xs leading-tight">
                   💬 Get instant help from our AI assistant!
                 </p>
               </div>
             </div>
             
             {/* Arrow pointing to button */}
             <div 
               className="absolute -bottom-1.5 right-6 w-3 h-3 transform rotate-45"
               style={{
                 background: 'linear-gradient(135deg, rgba(153, 0, 0, 0.95) 0%, rgba(244, 67, 54, 0.95) 100%)',
                 borderRight: '2px solid #ff3535',
                 borderBottom: '2px solid #ff3535'
               }}
             ></div>
           </div>
         </div>
       )}

       {/* Floating Chatbot Avatar - Right Side */}
       {!isChatOpen && (
         <button
           onClick={() => {
             setIsChatOpen(true);
             setShowBotMessage(false);
           }}
           className="fixed bottom-16 right-4 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300"
           style={{
             background: 'linear-gradient(135deg, #990000 0%, #f44336 100%)',
             boxShadow: '0 4px 15px rgba(153, 0, 0, 0.4)'
           }}
         >
           <MessageCircle className="h-6 w-6 text-white" />
         </button>
       )}

       {/* Chatbot Panel - Right Side (Centered with margins) */}
       {isChatOpen && (
         <div 
           className="fixed top-1/2 right-4 transform -translate-y-1/2 w-80 md:w-96 h-[65vh] max-h-[550px] z-40 flex flex-col shadow-2xl rounded-lg overflow-hidden"
           style={{
             background: 'transparent',
             maxHeight: 'calc(100vh - 100px)'
           }}
         >
           {/* Chat Header - Transparent with only close button */}
           <div 
             className="p-2 flex items-center justify-end shrink-0"
             style={{
               background: 'transparent'
             }}
           >
             <button 
               onClick={() => setIsChatOpen(false)}
               className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
               style={{
                 background: 'linear-gradient(135deg, #990000 0%, #f44336 100%)'
               }}
             >
               <X className="h-4 w-4 text-white" />
             </button>
           </div>

           {/* Botpress Webchat Container */}
           <div 
             id="bp-webchat-container"
             className="flex-1 overflow-hidden"
           >
             <div id="bp-embedded-webchat" className="w-full h-full" />
           </div>
         </div>
       )}

      {/* Custom Styles */}
      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.02);
          }
        }
        body {
          overflow: hidden !important;
          height: 100vh !important;
        }
        html {
          overflow: hidden !important;
          height: 100vh !important;
        }
        #bp-webchat-container {
          height: 100%;
          width: 100%;
        }
        #bp-webchat-container > div {
          height: 100% !important;
          width: 100% !important;
        }
        .bp-widget-web {
          height: 100% !important;
          width: 100% !important;
          position: relative !important;
        }
        /* Style Botpress webchat header to match red/maroon theme */
        #bp-webchat-container .bp-header,
        #bp-webchat-container [class*="header"],
        #bp-webchat-container [class*="Header"] {
          background: linear-gradient(135deg, #990000 0%, #f44336 100%) !important;
        }
        /* Style circular avatar icon to red/maroon */
        #bp-webchat-container [class*="avatar"],
        #bp-webchat-container [class*="Avatar"],
        #bp-webchat-container [class*="bot-avatar"],
        #bp-webchat-container .bp-avatar {
          background: linear-gradient(135deg, #990000 0%, #f44336 100%) !important;
          border-color: rgba(255, 255, 255, 0.3) !important;
        }
        /* Make sure all bot headers have same color */
        #bp-webchat-container [class*="bot-header"],
        #bp-webchat-container [class*="conversation-header"] {
          background: linear-gradient(135deg, #990000 0%, #f44336 100%) !important;
        }
        /* Make Botpress webchat background transparent */
        #bp-webchat-container .bp-widget-web,
        #bp-webchat-container [class*="widget"],
        #bp-webchat-container [class*="Widget"],
        #bp-webchat-container [class*="webchat"],
        #bp-webchat-container [class*="Webchat"] {
          background: transparent !important;
        }
        /* Make chat body/messages area transparent */
        #bp-webchat-container [class*="messages"],
        #bp-webchat-container [class*="Messages"],
        #bp-webchat-container [class*="conversation"],
        #bp-webchat-container [class*="Conversation"] {
          background: transparent !important;
        }
      `}</style>
    </section>
  );
};

export default Home;