import React from 'react';
import * as Lucide from 'lucide-react';

interface IconProps extends Lucide.LucideProps {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const LucideIcon = (Lucide as any)[name];
  if (!LucideIcon) return null;
  // Default to a thinner, more elegant stroke
  return <LucideIcon strokeWidth={1.5} {...props} />;
};