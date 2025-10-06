import { useState, useCallback, useMemo, useEffect } from "react";
import {
  Menu,
  X,
  Moon,
  Sun,
  Phone,
  Home,
} from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "motion/react";
import { SwaragamaFullLogo } from "./SwaragamaFullLogo";
import { SwaragamaScrolledLogo } from "./SwaragamaScrolledLogo";
import { SwaragamaDarkMobileLogo } from "./SwaragamaDarkMobileLogo";
import { useScrollState } from "../hooks/useScrollState";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { theme, setTheme } = useTheme();

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoized navigation items to prevent recreation
  const navItems = useMemo(() => [
    { name: "Beranda", href: "#home", id: "home" },
    { name: "Tentang Kami", href: "#about", id: "about" },
    { name: "Layanan", href: "#services", id: "services" },
    { name: "Trainer", href: "#trainers", id: "trainers" },
    { name: "Klien Kami", href: "#clients", id: "clients" },
    { name: "STC Corner", href: "#articles", id: "articles" },
    {
      name: "Testimonial",
      href: "#testimonials",
      id: "testimonials",
    },
    { name: "Kontak", href: "#contact", id: "contact" },
  ], []);

  // Use optimized scroll state hook
  const { isScrolled, isAtHeroTop, activeSection } = useScrollState(navItems, {
    scrollThreshold: 10,
    heroThresholdPercent: 0.3,
    throttleMs: 16, // 60fps
  });

  // Memoized section update handler with mobile optimization
  const handleSectionClick = useCallback((sectionId: string) => {
    // Close mobile menu when clicking nav item
    setIsMenuOpen(false);
    
    // Smooth scroll to section with proper offset for header
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = window.innerWidth < 768 ? 70 : 80; // Smaller header on mobile
      const sectionTop = section.offsetTop - headerHeight;
      
      // Use polyfill for browsers that don't support smooth scrolling
      try {
        window.scrollTo({
          top: Math.max(0, sectionTop), // Ensure we don't scroll to negative values
          behavior: 'smooth'
        });
      } catch (error) {
        // Fallback for older browsers
        window.scrollTo(0, Math.max(0, sectionTop));
      }
    }
  }, []);

  // Memoized theme toggle for performance
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  // Memoized header styles for performance - mobile gets solid background always
  const headerStyles = useMemo(() => {
    // Mobile always gets solid background
    if (isMobile) {
      return {
        background: theme === "dark"
          ? "rgba(26, 26, 26, 1)"
          : "rgba(255, 255, 255, 1)",
        backdropFilter: "none",
        borderBottom: theme === "dark"
          ? "1px solid rgba(64, 64, 64, 0.3)"
          : "1px solid rgba(233, 236, 239, 0.3)",
        boxShadow: theme === "dark"
          ? "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)"
          : "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        WebkitBackdropFilter: "none",
      };
    }
    
    // Desktop keeps original transparent/glassmorphism behavior
    return {
      background:
        isAtHeroTop && activeSection === "home"
          ? "transparent"
          : theme === "dark"
            ? "linear-gradient(180deg, rgba(26, 26, 26, 0.98) 0%, rgba(26, 26, 26, 0.95) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
      backdropFilter:
        isAtHeroTop && activeSection === "home"
          ? "none"
          : "blur(20px) saturate(180%)",
      borderBottom:
        isAtHeroTop && activeSection === "home"
          ? "1px solid transparent"
          : theme === "dark"
            ? "1px solid rgba(64, 64, 64, 0.3)"
            : "1px solid rgba(233, 236, 239, 0.3)",
      boxShadow:
        isAtHeroTop && activeSection === "home"
          ? "none"
          : theme === "dark"
            ? "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)"
            : "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      WebkitBackdropFilter:
        isAtHeroTop && activeSection === "home"
          ? "none"
          : "blur(20px) saturate(180%)",
    };
  }, [isAtHeroTop, activeSection, theme, isMobile]);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 header-optimized will-change-transform"
      style={headerStyles}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {/* Use different logo based on scroll state, theme, and device */}
            {isMobile && theme === "dark" ? (
              <SwaragamaDarkMobileLogo
                className="h-8 md:h-10 w-auto transition-all duration-300"
                showText={true}
              />
            ) : (isScrolled && theme === "light") || isMobile ? (
              <SwaragamaScrolledLogo
                className="h-8 md:h-10 w-auto transition-all duration-300"
                showText={true}
              />
            ) : (
              <SwaragamaFullLogo
                className="h-8 md:h-10 w-auto transition-all duration-300"
                showText={true}
              />
            )}
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-md"
                    : isAtHeroTop && activeSection === "home" && !isMobile
                      ? "text-white hover:bg-white/10 hover:text-white"
                      : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSectionClick(item.id)}
              >
                {item.name === "Beranda" && (
                  <Home className="w-4 h-4" />
                )}
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`relative ${
                isAtHeroTop && activeSection === "home" && !isMobile
                  ? "text-white hover:bg-white/10 hover:text-white"
                  : ""
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "light" ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>

            {/* CTA Button */}
            <Button
              size="sm"
              className="hidden md:flex bg-primary hover:bg-primary/90"
              onClick={() =>
                window.open(
                  "https://linktr.ee/swaragamatrainingcenter?utm_source=linktree_profile_share&ltsid=6d892c6a-72d6-4456-8b0b-05fd86985278",
                  "_blank",
                )
              }
            >
              <Phone className="w-4 h-4 mr-2" />
              Hubungi Kami
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className={`lg:hidden ${
                isAtHeroTop && activeSection === "home" && !isMobile
                  ? "text-white hover:bg-white/10 hover:text-white"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden mobile-nav-backdrop"
              style={{
                borderTop: `1px solid ${theme === 'dark' ? 'rgba(64, 64, 64, 0.3)' : 'rgba(233, 236, 239, 0.3)'}`,
                background: theme === 'dark' 
                  ? 'rgba(26, 26, 26, 1)' 
                  : 'rgba(255, 255, 255, 1)',
                backdropFilter: 'none',
                WebkitBackdropFilter: 'none',
              }}
            >
              <div className="py-4 space-y-2 border-t border-border">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-accent"
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.1,
                    }}
                    onClick={() => handleSectionClick(item.id)}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: navItems.length * 0.1,
                  }}
                  className="pt-2"
                >
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Hubungi Kami
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}