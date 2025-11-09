import { type VariantProps, cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[#e74c3c] text-[#f0ede5] hover:bg-[#c0392b]',
        secondary: 'border-transparent bg-[#3a3d44] text-[#f0ede5] hover:bg-[#3a3d44]/80',
        destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline: 'border-[#f0ede5] text-[#f0ede5]',
        success: 'border-transparent bg-green-500 text-white hover:bg-green-600',
        warning: 'border-transparent bg-yellow-500 text-[#2a2d34] hover:bg-yellow-600',
        info: 'border-transparent bg-blue-500 text-white hover:bg-blue-600',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
