import { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const button = tv({
  base: 'disabled:opacity-50 inline-flex items-center gap-1.5 text-xs font-medium',

  variants: {
    variant: {
      default:
        'py-2 px-2.5 rounded-md border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-100',
      primary:
        'py-2 px-2.5 rounded-md border border-amber-500 bg-amber-500 text-slate-100',
    },
    size: {
      default: '',
      icon: 'p-1.5',
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof button> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button {...props} className={button({ variant, size, className })} />
}