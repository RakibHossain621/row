import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

// import { cn } from "@/lib/utils"

const inputVariants = cva(
  'block border border-base-400 w-full text-sm py-4 bg-white placeholder-base-500 focus:outline-none focus:ring-inset focus:ring-1 focus:z-10',
  {
    variants: {
      variant: {},
      disabled: {
        false: 'cursor-pointer',
        true: 'opacity-75 cursor-not-allowed pointer-events-none',
      },
      error: {
        true: 'border-error-500 focus:ring-error-500',
        false: 'focus:border-purple-800 focus:ring-purple-800',
      },
      size: {
        sm: 'h-10',
        base: 'h-12',
      },
      rounded: {
        base: 'rounded-lg',
        full: 'rounded-full',
      },
      prefixIcon: {
        true: 'pl-10',
      },
      suffixIcon: {
        true: 'pr-10',
      },
    },
    compoundVariants: [
      {
        prefixIcon: false,
        suffixIcon: false,
        class: 'px-5',
      }
    ],
    defaultVariants: {
      size: 'base',
      // disabled: false,
      rounded: 'base',
    }
  })

const labelVariants = cva(
  'block text-xs',
  {
    variants: {
      error: {
        true: 'text-error-500',
        false: 'text-base-700',
      },
      required: {
        true: 'after:content-["*"] after:text-red-600'
      }
    },
    compoundVariants: [],
    defaultVariants: {}
  }
)

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {
  id?: string;
  label?: string;
  errorMessage?: string;
  prefixIcon?: any;
  suffixIcon?: any;
  size?: 'sm' | 'base';
  rounded?: 'base' | 'full';
}

const AppInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, size, rounded, errorMessage, prefixIcon, suffixIcon, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    const inputType =
    type === 'password' && !showPassword ? 'password' : type === 'password' ? 'text' : type;

    return (
      <div className="space-y-2">
        {label && <label htmlFor={props.id} className={labelVariants({ error: !!errorMessage, required: props.required })}>{label}</label>}

        <div className="relative">
          {
            prefixIcon && (
              <label htmlFor={props.id} className='absolute top-[3px] left-0 z-10 inline-flex items-center h-[44px] px-5 select-none text-black'>
                {prefixIcon}
              </label>
            )
          }

          <input
            {...props}
            ref={ref}
            className={inputVariants({ size, rounded, error: !!errorMessage, prefixIcon: !!prefixIcon, suffixIcon: !!suffixIcon })}
            type={inputType}
            onChange={props.onChange}
          />

          {type === 'password' &&
            <button onClick={() => setShowPassword(!showPassword)} type="button"
              className="absolute inset-y-0 flex items-center px-2 text-gray-500 right-5">

              {
                showPassword &&
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                  viewBox="0 0 20 20" fill="none">
                  <mask id="mask0_4292_60094" maskUnits="userSpaceOnUse" x="0" y="0" width="20"
                    height="20">
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_4292_60094)">
                    <path
                      d="M13.2708 11.1457L11.9792 9.854C12.0347 9.32623 11.875 8.87137 11.5 8.48942C11.125 8.10748 10.6736 7.94428 10.1458 7.99984L8.85417 6.70817C9.03472 6.63873 9.22222 6.58664 9.41667 6.55192C9.61111 6.5172 9.80556 6.49984 10 6.49984C10.9722 6.49984 11.7986 6.84012 12.4792 7.52067C13.1597 8.20123 13.5 9.02762 13.5 9.99984C13.5 10.1943 13.4826 10.3887 13.4479 10.5832C13.4132 10.7776 13.3542 10.9651 13.2708 11.1457ZM16.0417 13.9165L14.9583 12.8332C15.4583 12.4443 15.9132 12.0172 16.3229 11.5519C16.7326 11.0866 17.0764 10.5693 17.3542 9.99984C16.6736 8.59706 15.6701 7.49637 14.3438 6.69775C13.0174 5.89914 11.5694 5.49984 10 5.49984C9.63889 5.49984 9.28472 5.52067 8.9375 5.56234C8.59028 5.604 8.25 5.67345 7.91667 5.77067L6.70833 4.56234C7.23611 4.354 7.77431 4.20817 8.32292 4.12484C8.87153 4.0415 9.43056 3.99984 10 3.99984C11.9861 3.99984 13.8021 4.53803 15.4479 5.61442C17.0938 6.69081 18.2778 8.15262 19 9.99984C18.6944 10.7915 18.2882 11.5103 17.7812 12.1561C17.2743 12.8019 16.6944 13.3887 16.0417 13.9165ZM16 18.1248L13.2917 15.4165C12.7639 15.6109 12.2257 15.7568 11.6771 15.854C11.1285 15.9512 10.5694 15.9998 10 15.9998C8.01389 15.9998 6.19792 15.4616 4.55208 14.3853C2.90625 13.3089 1.72222 11.8471 1 9.99984C1.30556 9.20817 1.70833 8.48595 2.20833 7.83317C2.70833 7.18039 3.29167 6.59012 3.95833 6.06234L1.875 3.979L2.9375 2.9165L17.0625 17.0623L16 18.1248ZM5.02083 7.14567C4.53472 7.53456 4.08333 7.96164 3.66667 8.42692C3.25 8.8922 2.90972 9.4165 2.64583 9.99984C3.32639 11.4026 4.32986 12.5033 5.65625 13.3019C6.98264 14.1005 8.43056 14.4998 10 14.4998C10.3611 14.4998 10.7153 14.4755 11.0625 14.4269C11.4097 14.3783 11.7569 14.3123 12.1042 14.229L11.1667 13.2915C10.9722 13.3609 10.7778 13.413 10.5833 13.4478C10.3889 13.4825 10.1944 13.4998 10 13.4998C9.02778 13.4998 8.20139 13.1596 7.52083 12.479C6.84028 11.7984 6.5 10.9721 6.5 9.99984C6.5 9.80539 6.52431 9.61095 6.57292 9.4165C6.62153 9.22206 6.66667 9.02762 6.70833 8.83317L5.02083 7.14567Z"
                      fill="#121212" />
                  </g>
                </svg>
              }

              {
                !showPassword &&
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                  viewBox="0 0 20 20" fill="none">
                  <mask id="mask0_4292_12472" maskUnits="userSpaceOnUse" x="0" y="0" width="20"
                    height="20">
                    <rect width="20" height="20" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_4292_12472)">
                    <path
                      d="M10 13.5C10.9722 13.5 11.7986 13.1597 12.4792 12.4792C13.1597 11.7986 13.5 10.9722 13.5 10C13.5 9.02778 13.1597 8.20139 12.4792 7.52083C11.7986 6.84028 10.9722 6.5 10 6.5C9.02778 6.5 8.20139 6.84028 7.52083 7.52083C6.84028 8.20139 6.5 9.02778 6.5 10C6.5 10.9722 6.84028 11.7986 7.52083 12.4792C8.20139 13.1597 9.02778 13.5 10 13.5ZM10 12C9.44444 12 8.97222 11.8056 8.58333 11.4167C8.19444 11.0278 8 10.5556 8 10C8 9.44444 8.19444 8.97222 8.58333 8.58333C8.97222 8.19444 9.44444 8 10 8C10.5556 8 11.0278 8.19444 11.4167 8.58333C11.8056 8.97222 12 9.44444 12 10C12 10.5556 11.8056 11.0278 11.4167 11.4167C11.0278 11.8056 10.5556 12 10 12ZM10 16C8.0195 16 6.21535 15.4549 4.58754 14.3646C2.95974 13.2743 1.76389 11.8194 1 10C1.76389 8.18056 2.95974 6.72569 4.58754 5.63542C6.21535 4.54514 8.0195 4 10 4C11.9805 4 13.7847 4.54514 15.4125 5.63542C17.0403 6.72569 18.2361 8.18056 19 10C18.2361 11.8194 17.0403 13.2743 15.4125 14.3646C13.7847 15.4549 11.9805 16 10 16ZM10 14.5C11.5556 14.5 12.9931 14.0972 14.3125 13.2917C15.6319 12.4861 16.6458 11.3889 17.3542 10C16.6458 8.61111 15.6319 7.51389 14.3125 6.70833C12.9931 5.90278 11.5556 5.5 10 5.5C8.44444 5.5 7.00694 5.90278 5.6875 6.70833C4.36806 7.51389 3.35417 8.61111 2.64583 10C3.35417 11.3889 4.36806 12.4861 5.6875 13.2917C7.00694 14.0972 8.44444 14.5 10 14.5Z"
                      fill="#121212" />
                  </g>
                </svg>
              }

            </button>
          }

          {
            suffixIcon && (
              <label htmlFor={props.id} className='absolute top-[3px] right-0 z-10 inline-flex items-center h-[44px] px-5 select-none'>
                {suffixIcon}
              </label>
            )
          }
        </div>

        {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
      </div >
    )
  }
)

AppInput.displayName = "AppInput"

export { AppInput }
