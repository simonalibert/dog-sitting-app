// Icons ported from icons.jsx to react-native-svg.
import React from 'react';
import Svg, { Circle, Ellipse, Line, Path, Rect } from 'react-native-svg';

type IconProps = { size?: number; color?: string; strokeWidth?: number };

const Stroke: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  color = '#463E37',
  strokeWidth = 1.8,
  children,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    {children}
  </Svg>
);

export const Paw: React.FC<{ size?: number; color?: string }> = ({ size = 24, color = '#463E37' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Ellipse cx="12" cy="15.5" rx="4.4" ry="3.6" />
    <Ellipse cx="6.3" cy="11.2" rx="1.9" ry="2.4" />
    <Ellipse cx="10.1" cy="8.2" rx="1.9" ry="2.5" />
    <Ellipse cx="13.9" cy="8.2" rx="1.9" ry="2.5" />
    <Ellipse cx="17.7" cy="11.2" rx="1.9" ry="2.4" />
  </Svg>
);

export const Search: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Circle cx="11" cy="11" r="7" />
    <Line x1="16.2" y1="16.2" x2="21" y2="21" />
  </Stroke>
);

export const Leash: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Circle cx="8" cy="6.5" r="2.4" />
    <Path d="M8 8.9v6.2a2.6 2.6 0 0 0 2.6 2.6h2.2" />
    <Path d="M14 17.7c2.6 0 4.5-1.4 4.5-4 0-2-1.4-3.4-3.2-3.4" />
    <Circle cx="16.2" cy="18" r="1.2" />
  </Stroke>
);

export const Camera: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Path d="M4 8.5h3l1.4-2h7.2L18 8.5h2A1.5 1.5 0 0 1 21.5 10v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5z" />
    <Circle cx="12" cy="13.5" r="3.4" />
  </Stroke>
);

export const Star: React.FC<{ size?: number; fill?: string }> = ({ size = 24, fill = '#E8A33D' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill}>
    <Path d="M12 2.6l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.9 6.6 19.3l1.1-6.1L3.2 9l6.1-.8z" />
  </Svg>
);

export const Check: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Path d="M5 12.5l4.5 4.5L19 7" />
  </Stroke>
);

export const Verified: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = '#8FA77E' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2.4l2.3 1.7 2.8-.2.9 2.7 2.3 1.6-.8 2.7.8 2.7-2.3 1.6-.9 2.7-2.8-.2L12 21.6 9.7 19.9l-2.8.2-.9-2.7-2.3-1.6.8-2.7-.8-2.7 2.3-1.6.9-2.7 2.8.2z"
      fill={color}
    />
    <Path d="M8.4 12.2l2.4 2.4 4.6-4.8" stroke="#fff" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </Svg>
);

export const Calendar: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Rect x="3.5" y="5" width="17" height="15.5" rx="3" />
    <Line x1="3.5" y1="9.5" x2="20.5" y2="9.5" />
    <Line x1="8" y1="3" x2="8" y2="6.5" />
    <Line x1="16" y1="3" x2="16" y2="6.5" />
  </Stroke>
);

export const Clock: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Circle cx="12" cy="12" r="8.2" />
    <Path d="M12 7.4V12l3.1 2" />
  </Stroke>
);

export const ChevronRight: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Path d="M9 5l7 7-7 7" />
  </Stroke>
);

export const ArrowRight: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Line x1="4" y1="12" x2="19" y2="12" />
    <Path d="M13 6l6 6-6 6" />
  </Stroke>
);

export const Heart: React.FC<{ size?: number; fill?: string; color?: string }> = ({ size = 24, fill = '#E07A5F', color = '#E07A5F' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M12 20.5C6 16.5 3.5 13.2 3.5 9.6 3.5 7.3 5.3 5.5 7.6 5.5c1.6 0 3 .9 3.7 2.2.7-1.3 2.1-2.2 3.7-2.2 2.3 0 4.1 1.8 4.1 4.1 0 3.6-2.5 6.9-8.5 10.9z" />
  </Svg>
);

export const Shield: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Path d="M12 3l7 2.6v5.1c0 4.4-3 7.8-7 9.3-4-1.5-7-4.9-7-9.3V5.6z" />
    <Path d="M9 12l2 2 4-4.2" />
  </Stroke>
);

export const Money: React.FC<IconProps> = (p) => (
  <Stroke {...p}>
    <Circle cx="12" cy="12" r="8.2" />
    <Path d="M12 7.5v9M9.7 9.4c0-1 1-1.6 2.3-1.6s2.3.6 2.3 1.6-.8 1.5-2.3 1.9-2.3.9-2.3 1.9 1 1.6 2.3 1.6 2.3-.6 2.3-1.6" />
  </Stroke>
);

export const Back: React.FC<IconProps> = ({ size = 22, color = '#463E37', strokeWidth = 2.1 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M15 5l-7 7 7 7" />
  </Svg>
);

export const Msg: React.FC<IconProps> = ({ size = 18, color = '#6E8A5E', strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 5.5h16v11H8l-4 3.5z" />
  </Svg>
);
