import { cn } from '@/lib/utils'

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <input
    type="checkbox"
    className={cn(
      'h-4 w-4 rounded border border-input bg-background accent-primary cursor-pointer',
      className
    )}
    {...props}
  />
)
