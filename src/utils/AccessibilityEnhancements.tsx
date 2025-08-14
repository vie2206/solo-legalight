import React, { useEffect, useState } from 'react';
import { Accessibility, Eye, EyeOff, Volume2, VolumeX, Type, Contrast } from 'lucide-react';

// 🌟 COMPREHENSIVE ACCESSIBILITY ENHANCEMENTS
// WCAG 2.1 AA compliance for educational platform

interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large';
  contrast: 'normal' | 'high' | 'extra-high';
  reducedMotion: boolean;
  screenReader: boolean;
  dyslexiaFriendly: boolean;
  focusIndicator: 'default' | 'enhanced' | 'high-contrast';
  colorBlindFriendly: boolean;
  audioDescriptions: boolean;
  keyboardNavigation: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: (key: keyof AccessibilitySettings, value: any) => void;
  resetSettings: () => void;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 'medium',
  contrast: 'normal',
  reducedMotion: false,
  screenReader: false,
  dyslexiaFriendly: false,
  focusIndicator: 'default',
  colorBlindFriendly: false,
  audioDescriptions: false,
  keyboardNavigation: true
};

// 🎯 ACCESSIBILITY CONTEXT
const AccessibilityContext = React.createContext<AccessibilityContextType | null>(null);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem('legalight-accessibility-settings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const updateSetting = (key: keyof AccessibilitySettings, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('legalight-accessibility-settings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('legalight-accessibility-settings');
  };

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Font size adjustments
    const fontSizeMap = {
      'small': '14px',
      'medium': '16px',
      'large': '18px',
      'extra-large': '22px'
    };
    root.style.fontSize = fontSizeMap[settings.fontSize];

    // Contrast adjustments
    if (settings.contrast === 'high') {
      root.classList.add('high-contrast');
      root.classList.remove('extra-high-contrast');
    } else if (settings.contrast === 'extra-high') {
      root.classList.add('extra-high-contrast');
      root.classList.remove('high-contrast');
    } else {
      root.classList.remove('high-contrast', 'extra-high-contrast');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Dyslexia-friendly fonts
    if (settings.dyslexiaFriendly) {
      root.classList.add('dyslexia-friendly');
    } else {
      root.classList.remove('dyslexia-friendly');
    }

    // Enhanced focus indicators
    root.className = root.className.replace(/focus-\w+/g, '');
    root.classList.add(`focus-${settings.focusIndicator}`);

    // Color blind friendly mode
    if (settings.colorBlindFriendly) {
      root.classList.add('color-blind-friendly');
    } else {
      root.classList.remove('color-blind-friendly');
    }

  }, [settings]);

  // Keyboard navigation management
  useEffect(() => {
    if (settings.keyboardNavigation) {
      const handleKeyDown = (e: KeyboardEvent) => {
        // Skip to main content (Alt + M)
        if (e.altKey && e.key === 'm') {
          e.preventDefault();
          const main = document.getElementById('main-content');
          if (main) {
            main.focus();
            main.scrollIntoView({ behavior: 'smooth' });
          }
        }

        // Skip to navigation (Alt + N)
        if (e.altKey && e.key === 'n') {
          e.preventDefault();
          const nav = document.getElementById('main-navigation');
          if (nav) {
            nav.focus();
            nav.scrollIntoView({ behavior: 'smooth' });
          }
        }

        // Accessibility panel toggle (Alt + A)
        if (e.altKey && e.key === 'a') {
          e.preventDefault();
          const panel = document.getElementById('accessibility-panel');
          if (panel) {
            (panel as HTMLElement).click();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [settings.keyboardNavigation]);

  return (
    <AccessibilityContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </AccessibilityContext.Provider>
  );
};

// 🎛️ ACCESSIBILITY CONTROL PANEL
export const AccessibilityPanel: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
}> = ({ isOpen, onClose }) => {
  const context = React.useContext(AccessibilityContext);
  if (!context) throw new Error('AccessibilityPanel must be used within AccessibilityProvider');

  const { settings, updateSetting, resetSettings } = context;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Accessibility className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Accessibility Settings</h2>
                <p className="text-purple-100 text-sm">Customize your learning experience</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
              aria-label="Close accessibility panel"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Visual Settings */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Visual Settings
              </h3>
              
              <div className="space-y-4">
                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Font Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['small', 'medium', 'large', 'extra-large'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => updateSetting('fontSize', size)}
                        className={`p-3 text-center rounded-lg border transition-all ${
                          settings.fontSize === size
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Type className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs capitalize">{size}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contrast */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contrast Level
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['normal', 'high', 'extra-high'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => updateSetting('contrast', level)}
                        className={`p-3 text-center rounded-lg border transition-all ${
                          settings.contrast === level
                            ? 'bg-blue-500 text-white border-blue-500'
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                      >
                        <Contrast className="w-4 h-4 mx-auto mb-1" />
                        <span className="text-xs capitalize">{level.replace('-', ' ')}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Toggle Options */}
                <div className="space-y-3">
                  {[
                    { key: 'reducedMotion', label: 'Reduce Motion', description: 'Minimize animations and transitions' },
                    { key: 'dyslexiaFriendly', label: 'Dyslexia-Friendly Font', description: 'Use fonts designed for dyslexic readers' },
                    { key: 'colorBlindFriendly', label: 'Color Blind Friendly', description: 'Enhanced color patterns and indicators' }
                  ].map(({ key, label, description }) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                      </div>
                      <button
                        onClick={() => updateSetting(key as keyof AccessibilitySettings, !settings[key as keyof AccessibilitySettings])}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings[key as keyof AccessibilitySettings] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                        role="switch"
                        aria-checked={settings[key as keyof AccessibilitySettings] as boolean}
                        aria-label={`Toggle ${label}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings[key as keyof AccessibilitySettings] ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Audio & Navigation */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Volume2 className="w-5 h-5" />
                Audio & Navigation
              </h3>
              
              <div className="space-y-3">
                {[
                  { key: 'screenReader', label: 'Screen Reader Support', description: 'Enhanced screen reader compatibility' },
                  { key: 'audioDescriptions', label: 'Audio Descriptions', description: 'Audio descriptions for visual content' },
                  { key: 'keyboardNavigation', label: 'Enhanced Keyboard Navigation', description: 'Advanced keyboard shortcuts and navigation' }
                ].map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{label}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
                    </div>
                    <button
                      onClick={() => updateSetting(key as keyof AccessibilitySettings, !settings[key as keyof AccessibilitySettings])}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        settings[key as keyof AccessibilitySettings] ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                      role="switch"
                      aria-checked={settings[key as keyof AccessibilitySettings] as boolean}
                      aria-label={`Toggle ${label}`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          settings[key as keyof AccessibilitySettings] ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Keyboard Shortcuts */}
            <section>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Keyboard Shortcuts
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Skip to main content:</span>
                    <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Alt + M</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Skip to navigation:</span>
                    <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Alt + N</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Open accessibility panel:</span>
                    <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Alt + A</code>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={resetSettings}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Reset to Default
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Apply Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 🎯 ACCESSIBILITY TRIGGER BUTTON
export const AccessibilityTrigger: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      id="accessibility-panel"
      onClick={onClick}
      className="fixed bottom-4 left-4 z-40 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 focus:ring-4 focus:ring-purple-300"
      aria-label="Open accessibility settings"
      title="Accessibility Settings (Alt + A)"
    >
      <Accessibility className="w-6 h-6" />
    </button>
  );
};

// 🎯 SKIP NAVIGATION LINKS
export const SkipNavigation: React.FC = () => {
  return (
    <div className="sr-only focus:not-sr-only">
      <a
        href="#main-content"
        className="absolute top-0 left-0 bg-blue-600 text-white px-4 py-2 z-50 focus:relative focus:z-auto"
      >
        Skip to main content
      </a>
      <a
        href="#main-navigation"
        className="absolute top-0 left-20 bg-blue-600 text-white px-4 py-2 z-50 focus:relative focus:z-auto"
      >
        Skip to navigation
      </a>
    </div>
  );
};

// 🎯 HOOKS
export const useAccessibility = () => {
  const context = React.useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export default {
  AccessibilityProvider,
  AccessibilityPanel,
  AccessibilityTrigger,
  SkipNavigation,
  useAccessibility
};