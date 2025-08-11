import React from 'react';
import { motion } from 'framer-motion';
import {
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  ExternalLink
} from 'lucide-react';
import { GlassCard, colors } from './HulyDesignSystem';

const HulyFooter: React.FC = () => {
  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'AI Tutor', href: '#ai' },
      { label: 'Mock Tests', href: '#tests' },
      { label: 'Analytics', href: '#analytics' },
      { label: 'Pricing', href: '#pricing' }
    ],
    Resources: [
      { label: 'Blog', href: '#blog' },
      { label: 'Study Materials', href: '#materials' },
      { label: 'CLAT Guide', href: '#guide' },
      { label: 'Success Stories', href: '#stories' },
      { label: 'FAQ', href: '#faq' }
    ],
    Company: [
      { label: 'About Us', href: '#about' },
      { label: 'Careers', href: '#careers', badge: 'Hiring' },
      { label: 'Contact', href: '#contact' },
      { label: 'Partners', href: '#partners' },
      { label: 'Press Kit', href: '#press' }
    ],
    Legal: [
      { label: 'Privacy Policy', href: '#privacy' },
      { label: 'Terms of Service', href: '#terms' },
      { label: 'Cookie Policy', href: '#cookies' },
      { label: 'Refund Policy', href: '#refund' },
      { label: 'Data Security', href: '#security' }
    ]
  };

  const socialLinks = [
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <Linkedin />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <Youtube />, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.background.secondary }}>
      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Newsletter section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <GlassCard intensity="medium" blur="lg" gradient className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Stay ahead with SOLO
                </h3>
                <p className="text-gray-400">
                  Get the latest updates, study tips, and exclusive content delivered to your inbox.
                </p>
              </div>
              <div className="flex space-x-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                />
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo and description */}
          <div className="col-span-2 md:col-span-1">
            <motion.div 
              className="flex items-center space-x-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-bold text-xl">SOLO</span>
            </motion.div>
            <p className="text-gray-400 text-sm mb-4">
              AI-powered legal education platform helping students achieve their CLAT dreams.
            </p>
            <p className="text-purple-400 text-sm font-medium mb-4">
              we can do hard things
            </p>
            
            {/* Social links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {React.cloneElement(social.icon as React.ReactElement<any>, { size: 16 })}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <motion.a
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors inline-flex items-center space-x-2"
                      whileHover={{ x: 3 }}
                    >
                      <span>{link.label}</span>
                      {'badge' in link && (
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <GlassCard intensity="light" blur="md" className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-sm text-white">support@solo.education</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-sm text-white">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Location</p>
                  <p className="text-sm text-white">Bangalore, India</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2024 SOLO by Legalight. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
              >
                <span>Built with</span>
                <Heart className="w-3 h-3 text-red-500" />
                <span>in India</span>
              </motion.a>
              
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                whileHover={{ scale: 1.05 }}
              >
                <span>Status</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default HulyFooter;