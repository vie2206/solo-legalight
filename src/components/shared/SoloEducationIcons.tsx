import React from 'react';

interface SoloEducationIconProps {
  name: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  className?: string;
}

export const SoloEducationIcon: React.FC<SoloEducationIconProps> = ({
  name,
  size = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  // Map of education icon names to their base64 or URL representations
  const iconMap: { [key: string]: string } = {
    medal: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIyNCIgcj0iMTYiIGZpbGw9IiNGRkI5MDAiLz4KPHN0ciBzdHJva2U9IiNGRjAwMDAiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTI0IDQwTDMyIDU2TDQwIDQwIi8+CjxjaXJjbGUgY3g9IjMyIiBjeT0iMjQiIHI9IjEwIiBmaWxsPSIjRkZGRkZGIi8+Cjx0ZXh0IHg9IjMyIiB5PSIyOCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMDAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4xPC90ZXh0Pgo8L3N2Zz4=',
    book: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTIiIHk9IjgiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0OCIgZmlsbD0iIzAwQTFGRiIgcng9IjQiLz4KPHJlY3QgeD0iMTYiIHk9IjEyIiB3aWR0aD0iMzIiIGhlaWdodD0iNDAiIGZpbGw9IiNGRkZGRkYiIHJ4PSIyIi8+CjxsaW5lIHgxPSIyMCIgeTE9IjIwIiB4Mj0iNDQiIHkyPSIyMCIgc3Ryb2tlPSIjODk2NUU1IiBzdHJva2Utd2lkdGg9IjIiLz4KPGxpbmUgeDE9IjIwIiB5MT0iMjgiIHgyPSI0NCIgeTI9IjI4IiBzdHJva2U9IiM4OTY1RTUiIHN0cm9rZS13aWR0aD0iMiIvPgo8bGluZSB4MT0iMjAiIHkxPSIzNiIgeDI9IjQ0IiB5Mj0iMzYiIHN0cm9rZT0iIzg5NjVFNSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==',
    hat: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjMyIiBjeT0iNDQiIHJ4PSIyOCIgcnk9IjgiIGZpbGw9IiMxMTFDMkQiLz4KPHBhdGggZD0iTTggMzJMMzIgMjBMNTYgMzJMMzIgNDBMOCAzMloiIGZpbGw9IiMwMEExRkYiLz4KPHJlY3QgeD0iNTAiIHk9IjMyIiB3aWR0aD0iNCIgaGVpZ2h0PSIxNiIgZmlsbD0iIzAwQTFGRiIvPgo8L3N2Zz4=',
    trophy: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGVsbGlwc2UgY3g9IjMyIiBjeT0iNTYiIHJ4PSIxNiIgcnk9IjQiIGZpbGw9IiMxMTFDMkQiLz4KPHJlY3QgeD0iMjgiIHk9IjQwIiB3aWR0aD0iOCIgaGVpZ2h0PSIxNiIgZmlsbD0iI0ZGQjkwMCIvPgo8cGF0aCBkPSJNMTYgMjBDMTYgMTIgMjQgOCAzMiA4QzQwIDggNDggMTIgNDggMjBWMzJDNDggMzYgNDQgNDAgNDAgNDBIMjRDMjAgNDAgMTYgMzYgMTYgMzJWMjBaIiBmaWxsPSIjRkZCOTAwIi8+CjxjaXJjbGUgY3g9IjE0IiBjeT0iMjQiIHI9IjYiIGZpbGw9IiNGRkI5MDAiLz4KPGNpcmNsZSBjeD0iNTAiIGN5PSIyNCIgcj0iNiIgZmlsbD0iI0ZGQjkwMCIvPgo8L3N2Zz4=',
    lightbulb: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIyNCIgcj0iMTYiIGZpbGw9IiNGRkI5MDAiLz4KPHJlY3QgeD0iMjYiIHk9IjQwIiB3aWR0aD0iMTIiIGhlaWdodD0iOCIgZmlsbD0iIzExMUMyRCIgcng9IjIiLz4KPHJlY3QgeD0iMjgiIHk9IjQ4IiB3aWR0aD0iOCIgaGVpZ2h0PSI0IiBmaWxsPSIjMTExQzJEIiByeD0iMiIvPgo8cGF0aCBkPSJNMzIgMTJWOE0yMCAxNkwxNyAxM00xNiAzMkgxMk00NCAxNkw0NyAxM000OCwzMkg1Mk0yMCA0OEwxNyA1MU00NCA0OEw0NyA1MSIgc3Ryb2tlPSIjRkZCOTAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=',
    calculator: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iMTIiIHk9IjgiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0OCIgZmlsbD0iIzExMUMyRCIgcng9IjQiLz4KPHJlY3QgeD0iMTYiIHk9IjEyIiB3aWR0aD0iMzIiIGhlaWdodD0iOCIgZmlsbD0iIzAwQ0VCNiIgcng9IjIiLz4KPGNpcmNsZSBjeD0iMjQiIGN5PSIzMiIgcj0iNCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSI0IiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iMzIiIHI9IjQiIGZpbGw9IiNGRkZGRkYiLz4KPGNpcmNsZSBjeD0iMjQiIGN5PSI0NCIgcj0iNCIgZmlsbD0iI0ZGRkZGRiIvPgo8Y2lyY2xlIGN4PSIzMiIgY3k9IjQ0IiByPSI0IiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjQwIiBjeT0iNDQiIHI9IjQiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+',
    globe: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMjQiIGZpbGw9IiMwMEExRkYiLz4KPGVsbGlwc2UgY3g9IjMyIiBjeT0iMzIiIHJ4PSIxMiIgcnk9IjI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMiIvPgo8bGluZSB4MT0iOCIgeTE9IjMyIiB4Mj0iNTYiIHkyPSIzMiIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjIiLz4KPGxpbmUgeDE9IjMyIiB5MT0iOCIgeDI9IjMyIiB5Mj0iNTYiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik0xNiAyMEw0OCA0NE0xNiA0NEw0OCAyMCIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjEiLz4KPC9zdmc+',
    chemistry: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTI0IDhIMjhWMjRMMTYgNDhINDhMMzYgMjRWOEg0MEg0NFY0SDIwVjhIMjRaIiBmaWxsPSIjNDZDQUVCIi8+CjxjaXJjbGUgY3g9IjI0IiBjeT0iNDAiIHI9IjQiIGZpbGw9IiNGRkJCMDAiLz4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNCIgZmlsbD0iI0ZGNjY5MiIvPgo8Y2lyY2xlIGN4PSIzMiIgY3k9IjQ4IiByPSIzIiBmaWxsPSIjMDBDRUI2Ii8+CjxyZWN0IHg9IjI2IiB5PSI2IiB3aWR0aD0iMTIiIGhlaWdodD0iNCIgZmlsbD0iIzExMUMyRCIgcng9IjIiLz4KPC9zdmc+',
    mathematics: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjQ4IiBoZWlnaHQ9IjQ4IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMxMTFDMkQiIHN0cm9rZS13aWR0aD0iMiIgcng9IjQiLz4KPGxpbmUgeDE9IjE2IiB5MT0iMjQiIHgyPSI0OCIgeTI9IjI0IiBzdHJva2U9IiM4OTY1RTUiIHN0cm9rZS13aWR0aD0iMiIvPgo8bGluZSB4MT0iMzIiIHkxPSIxNiIgeDI9IjMyIiB5Mj0iMzIiIHN0cm9rZT0iIzg5NjVFNSIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjI0IiB5PSI0OCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEyIiBmaWxsPSIjMTExQzJEIj4yKzI9NDwvdGV4dD4KPC9zdmc+'
  };

  const iconSrc = iconMap[name];

  if (!iconSrc) {
    // Fallback to a generic education icon
    return (
      <div className={`${sizeClasses[size]} ${className} bg-solo-primary-light rounded-lg flex items-center justify-center`}>
        <span className="text-solo-primary font-bold text-xs">{name.charAt(0).toUpperCase()}</span>
      </div>
    );
  }

  return (
    <img
      src={iconSrc}
      alt={name}
      className={`${sizeClasses[size]} ${className} object-contain`}
    />
  );
};

// Pre-defined education icon components
export const MedalIcon: React.FC<Omit<SoloEducationIconProps, 'name'>> = (props) => 
  <SoloEducationIcon name="medal" {...props} />;

export const BookIcon: React.FC<Omit<SoloEducationIconProps, 'name'>> = (props) => 
  <SoloEducationIcon name="book" {...props} />;

export const GraduationHatIcon: React.FC<Omit<SoloEducationIconProps, 'name'>> = (props) => 
  <SoloEducationIcon name="hat" {...props} />;

export const TrophyIcon: React.FC<Omit<SoloEducationIconProps, 'name'>> = (props) => 
  <SoloEducationIcon name="trophy" {...props} />;

export const LightBulbIcon: React.FC<Omit<SoloEducationIconProps, 'name'>> = (props) => 
  <SoloEducationIcon name="lightbulb" {...props} />;

export const CalculatorIcon: React.FC<Omit<SoloEducationIconProps, 'name'>> = (props) => 
  <SoloEducationIcon name="calculator" {...props} />;

export const GlobeIcon: React.FC<Omit<SoloEducationIconProps, 'name'>> = (props) => 
  <SoloEducationIcon name="globe" {...props} />;

export const ChemistryIcon: React.FC<Omit<SoloEducationIconProps, 'name'>> = (props) => 
  <SoloEducationIcon name="chemistry" {...props} />;

export const MathematicsIcon: React.FC<Omit<SoloEducationIconProps, 'name'>> = (props) => 
  <SoloEducationIcon name="mathematics" {...props} />;