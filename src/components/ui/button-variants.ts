import { type VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[#e74c3c] text-[#f0ede5] hover:bg-[#c0392b] focus-visible:ring-[#e74c3c]',
        destructive: 'bg-red-500 text-white hover:bg-red-600 focus-visible:ring-red-500',
        outline:
          'border-2 border-[#f0ede5] bg-transparent text-[#f0ede5] hover:bg-[#3a3d44] focus-visible:ring-[#f0ede5]',
        secondary: 'bg-[#3a3d44] text-[#f0ede5] hover:bg-[#3a3d44]/80 focus-visible:ring-[#3a3d44]',
        ghost: 'text-[#f0ede5] hover:bg-[#3a3d44] focus-visible:ring-[#3a3d44]',
        link: 'text-[#e74c3c] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
