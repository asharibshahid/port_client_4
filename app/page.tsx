"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Image from "next/image"
import { FaInstagram, FaFacebookF, FaBehance } from 'react-icons/fa';



const FuturisticPortfolio: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const fullText = "Hi Im Affan Creative Visual Storyteller | Expert in Graphics Design & AI-Driven Content";
const socialLinks = [
  {
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/affanvisuals99',
  },
  {
    icon: <FaFacebookF />,
    url: 'https://www.facebook.com/profile.php?id=61578157021777',
  },
  {
    icon: <FaBehance />,
    url: 'https://www.behance.net/affanvisuals',
  },
];

  // Navigation items
  const navItems = [
    { id: 'home', label: 'Home', icon: '' },
    { id: 'services', label: 'Services', icon: '⚡' },
    { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
    { id: 'testimonials', label: 'Testimonials', icon: '💬' },
    { id: 'contact', label: 'Contact', icon: '📧' }
  ];

  // Services data
  const services = [
    { title: 'Graphic Design', icon: '🎨', description: 'Visual identity & brand design' },
    { title: 'Social Media Posts', icon: '📱', description: 'Engaging social content design' },
    { title: 'CGI UGC Ads', icon: '🎬', description: 'Cinematic 3D advertising content' },
    { title: 'AI Brand Design', icon: '🤖', description: 'AI powered brand solutions' }
  ];

  // Typewriter effect
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, fullText]);

  // Mouse tracking
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  // Cursor variants
  const cursorVariants = {
    default: {
      height: 32,
      width: 32,
      backgroundColor: ' #0f2638  #fcb514',
      border: '2px solid rgb(0, 255, 255)',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
    },
    text: {
      height: 64,
      width: 64,
      backgroundColor: ' #0f2638  #fcb514',
      border: '2px solid rgb(255, 0, 255)',
      boxShadow: '0 0 30px rgba(255, 0, 255, 0.7)'
    },
    button: {
      height: 80,
      width: 80,
      backgroundColor: 'rgba(0, 255, 0, 0.2)',
      border: '3px solid rgb(0, 255, 0)',
      boxShadow: '0 0 40px rgba(0, 255, 0, 0.8)'
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12 linear-gradient(to right, #0f2638, #fcb514)"
          >
            {/* Profile Section */}
            <div className="relative">
              <motion.div
                className="w-48 h-48 mx-auto relative"
                whileHover={{ scale: 1.1 }}
                onHoverStart={() => setCursorVariant('button')}
                onHoverEnd={() => setCursorVariant('default')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-spin-slow blur-sm opacity-75"></div>
                <div className="relative w-full h-full bg-black rounded-full border-4 border-cyan-400 overflow-hidden shadow-2xl">
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 to-cyan-900 flex items-center justify-center text-8xl">
                    <Image
                      src="/profile.png"
                      alt="Profile Picture"
                      width={192}
                      height={192}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                {/* Floating Elements */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      left: `${50 + 35 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                      top: `${50 + 35 * Math.sin((i * 45 * Math.PI) / 180)}%`,
                    }}
                  />
                ))}
              </motion.div>
            </div>

            {/* Typewriter Text */}
            <div className="space-y-6">
              <h1 
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight min-h-[8rem]"
                onMouseEnter={() => setCursorVariant('text')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {displayedText}
                <motion.span
                  className="inline-block w-1 h-12 md:h-16 bg-cyan-400 ml-2"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </h1>
              
              <motion.p 
                className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.8 }}
              >
                With over 2 years of professional experience, I specialize in crafting impactful social media designs, highconverting UGC ads, and cinematic CGI visuals. Blending creativity with cutting-edge AI tools, I help brands stand
out with designs that captivate, convert, and inspire.

              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col md:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4, duration: 0.8 }}
            >
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full text-white font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setCursorVariant('button')}
                onHoverEnd={() => setCursorVariant('default')}
                onClick={() => setActiveSection('portfolio')}
              >
                View My Work
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-purple-500 rounded-full text-purple-400 font-semibold text-lg hover:bg-purple-500/20 hover:shadow-xl hover:shadow-purple-500/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setCursorVariant('button')}
                onHoverEnd={() => setCursorVariant('default')}
                onClick={() => setActiveSection('contact')}
              >
                Lets Connect
              </motion.button>
            </motion.div>
          </motion.div>
        );

      case 'services':
        return (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  className="group relative p-8 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-3xl hover:border-purple-500/50 transition-all duration-500"
                  whileHover={{ scale: 1.02, y: -5 }}
                  onHoverStart={() => setCursorVariant('button')}
                  onHoverEnd={() => setCursorVariant('default')}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-gray-300 text-lg">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'portfolio':
        return (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Portfolio
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="group relative h-64 bg-gradient-to-br from-cyan-900/30 to-purple-900/30 rounded-2xl overflow-hidden border border-cyan-500/30 hover:border-purple-500/50 transition-all duration-500"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  onHoverStart={() => setCursorVariant('button')}
                  onHoverEnd={() => setCursorVariant('default')}
                  initial={{ opacity: 0, rotateX: -30 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <h3 className="font-bold text-lg">Project {index + 1}</h3>
                    <p className="text-gray-300">Creative Design</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'testimonials':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Testimonials
            </h2>
            <div className="space-y-8">
  {[
    {
      rating: "★★★★★ 5.0",
      text: "Affan work ethic is impeccable, not only did he take the time to work with me but he truly brought my vision to life. If you are looking for someone who s easy to work with and has great skills, this is your guy!",
    },
    {
      rating: "★★★★☆ 4.9",
      text: "It was once again nice to work with Affan on a totally different and new project by me but not by him obviously. The logo turned out to be Mr. Perfect. The color grading and overall feel of it feels premium and luxurious.",
    },
    {
      rating: null,
      text: "I really appreciated how you helped me out with my CV. Your work was outstanding. You truly understood my strengths and showcased them perfectly. The final product looked professional and well-structured. Highly recommend their services to anyone looking to elevate their job prospects.",
    },
    {
      rating: "★★★★★ 5.0",
      text: "Affan was very helpful and very available. He worked quickly around some ambiguity and put my product in the best possible position to be successful.",
    },
    {
      rating: "★★★★★ 5.0",
      text: "Great on all fronts. Communication. The job was done well, no complaints, would work again.",
    },
  ].map((review, index) => (
    <motion.div
      key={index}
      className="p-8 bg-black/40 backdrop-blur-xl border border-green-500/30 rounded-3xl"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.3, duration: 0.8 }}
    >
      <p className="text-gray-300 text-lg mb-4 italic">“{review.text}”</p>
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-[#0f2638] to-[#fcb514] rounded-full"></div>
        <div>
          {review.rating && (
            <p className="text-yellow-400 font-semibold">{review.rating}</p>
          )}
        </div>
      </div>
    </motion.div>
  ))}
</div>

          </motion.div>
        );

      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-pink-400 to-red-400 bg-clip-text text-transparent">
              Let's Create Together
            </h2>
            <div className="max-w-2xl mx-auto">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="p-4 bg-black/40 border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="p-4 bg-black/40 border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300"
                  />
                </div>
                <textarea
                  rows={6}
                  placeholder="Tell me about your project..."
                  className="w-full p-4 bg-black/40 border border-cyan-500/30 rounded-2xl text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none transition-all duration-300 resize-none"
                ></textarea>
                <motion.button
                  className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setCursorVariant('button')}
                  onHoverEnd={() => setCursorVariant('default')}
                  onClick={() => alert('Message sent! (Demo)')}
                >
                  Send Message
                </motion.button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black relative overflow-hidden cursor-none"
    >
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        variants={cursorVariants}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Matrix Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
        
        {/* Floating Particles */}
        {Array.from({ length: 100 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 1920],
              y: [0, Math.random() * 1080],
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}

        {/* RGB Gradient Orbs */}
        <motion.div
          className="absolute -top-96 -left-96 w-96 h-96 bg-gradient-to-r from-red-500/20 via-green-500/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-96 -right-96 w-96 h-96 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 p-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-black/20 border border-cyan-500/30 rounded-full px-8 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
              >
                AFFAN BAQAI 
              </motion.div>
              
              {/* Desktop Menu */}
              <div className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    className={`px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onHoverStart={() => setCursorVariant('button')}
                    onHoverEnd={() => setCursorVariant('default')}
                    onClick={() => setActiveSection(item.id)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                className="md:hidden p-2 text-white"
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="space-y-1">
                  <div className="w-6 h-0.5 bg-cyan-400"></div>
                  <div className="w-6 h-0.5 bg-purple-400"></div>
                  <div className="w-6 h-0.5 bg-pink-400"></div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              className="absolute top-24 left-6 right-6 bg-black/90 border border-cyan-500/30 rounded-3xl p-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => {
                      setActiveSection(item.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    <span className="mr-3 text-xl">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {renderSection()}
          </AnimatePresence>
        </div>
      </main>

      {/* Social Links */}
      <motion.div
  className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-4"
  initial={{ x: 100 }}
  animate={{ x: 0 }}
  transition={{ delay: 1, duration: 0.8 }}
>
  {socialLinks.map((item, index) => (
    <motion.a
      key={index}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-12 h-12 bg-black/40 backdrop-blur-xl border border-cyan-500/30 rounded-full flex items-center justify-center text-xl hover:border-purple-500/50 cursor-pointer transition-all duration-300 text-white"
      whileHover={{ scale: 1.1, x: -5 }}
      onHoverStart={() => setCursorVariant('button')}
      onHoverEnd={() => setCursorVariant('default')}
    >
      {item.icon}
    </motion.a>
  ))}
</motion.div>

    </div>
  );
};

export default FuturisticPortfolio;
// ASHARIB