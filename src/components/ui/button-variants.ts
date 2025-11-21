import { type VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'btn-primary',
        destructive: 'bg-[#ef4444] text-white hover:bg-[#dc2626] shadow-sm hover:shadow-md hover:-translate-y-0.5',
        outline: 'btn-secondary',
        secondary: 'btn-secondary',
        ghost: 'hover:bg-[#f8f9fa] text-[#64748b] hover:text-[#2563eb]',
        link: 'text-[#2563eb] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-12 px-8 text-base',
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
