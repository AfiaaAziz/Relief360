// Relief360 Color Theme
export const colors = {
  green: '#6aa84f',
  darkRed: '#990000',
  red: '#f44336',
  orange: '#f48836',
  darkBlue: '#16537e',
  darkGreen: '#38761d',
  brightRed: '#ff3535',
};

// Gradient combinations
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.darkGreen} 100%)`,
  secondary: `linear-gradient(135deg, ${colors.red} 0%, ${colors.orange} 100%)`,
  accent: `linear-gradient(135deg, ${colors.green} 0%, ${colors.darkGreen} 100%)`,
  danger: `linear-gradient(135deg, ${colors.brightRed} 0%, ${colors.red} 100%)`,
  warning: `linear-gradient(135deg, ${colors.orange} 0%, ${colors.red} 100%)`,
  info: `linear-gradient(135deg, ${colors.darkBlue} 0%, ${colors.green} 100%)`,
};

// Radial gradients
export const radialGradients = {
  primary: `radial-gradient(circle at center, ${colors.darkBlue} 0%, ${colors.darkGreen} 100%)`,
  secondary: `radial-gradient(circle at center, ${colors.red} 0%, ${colors.orange} 100%)`,
  accent: `radial-gradient(circle at 30% 50%, ${colors.green} 0%, ${colors.darkGreen} 100%)`,
  danger: `radial-gradient(circle at center, ${colors.brightRed} 0%, ${colors.darkRed} 100%)`,
};

// Tailwind color classes mapping
export const tailwindColors = {
  green: '[#6aa84f]',
  darkRed: '[#990000]',
  red: '[#f44336]',
  orange: '[#f48836]',
  darkBlue: '[#16537e]',
  darkGreen: '[#38761d]',
  brightRed: '[#ff3535]',
};

