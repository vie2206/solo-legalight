import React from 'react';
import { SoloLoadingIcon } from '../shared/SoloAnimatedIcon';

interface SoloAuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  isLoading?: boolean;
}

export const SoloAuthLayout: React.FC<SoloAuthLayoutProps> = ({
  children,
  title,
  subtitle,
  isLoading = false
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-solo-primary via-solo-secondary to-solo-primary flex items-center justify-center p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-lg rounded-3xl mb-6 shadow-2xl">
            <span className="text-3xl font-bold text-white">S</span>
          </div>
          <h1 className="text-4xl font-bold text-white font-jakarta mb-2">
            SOLO <span className="text-white/80">by Legalight</span>
          </h1>
          <p className="text-white/90 font-medium text-lg mb-2">
            we can do hard things
          </p>
          <p className="text-white/70 text-sm">
            AI-Powered Legal Education Platform
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-solo-dark font-jakarta mb-2">
              {title}
            </h2>
            <p className="text-solo-gray-600">
              {subtitle}
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <SoloLoadingIcon size="large" />
              <p className="text-solo-gray-600 mt-4">Processing...</p>
            </div>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/70 text-sm">
            © 2024 Legalight Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};