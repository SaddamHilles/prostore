import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert prisma object into a reqular JS object
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}

// Format errors
export async function formatError(error: unknown): Promise<string> {
  if (typeof error === 'object' && error !== null) {
    if ('name' in error && error.name === 'ZodError' && 'errors' in error) {
      // Handle Zod error
      if (typeof error.errors === 'object' && error.errors !== null) {
        const fieldErrors = Object.keys(error.errors).map(field => {
          const err = (error.errors as Record<string, { message: string }>)[
            field
          ];
          return err.message;
        });

        return fieldErrors.join('. ');
      }
    } else if (
      'name' in error &&
      error.name === 'PrismaClientKnownRequestError' &&
      'code' in error &&
      error.code === 'P2002'
    ) {
      // Handle Prisma error
      if (
        'meta' in error &&
        typeof error.meta === 'object' &&
        error.meta !== null
      ) {
        const field =
          'target' in error.meta && Array.isArray(error.meta.target)
            ? error.meta.target[0]
            : 'Field';

        return `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } already exist`;
      }
    } else if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
  }

  return JSON.stringify(error);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// export async function formatError(error: any) {
//   if (error.name === 'ZodError') {
//     // Handle Zod error
//     const fieldErrors = Object.keys(error.errors).map(
//       field => error.errors[field].message,
//     );

//     return fieldErrors.join('. ');
//   } else if (
//     error.name === 'PrismaClientKnownRequestError' &&
//     error.code === 'P2002'
//   ) {
//     // Handle Prisma error
//     const field = error.meta?.target ? error.meta.target[0] : 'Field';

//     return `${field.charAt(0).toUpperCase() + field.slice(1)} already exist`;
//   } else {
//     return typeof error.message === 'string'
//       ? error.message
//       : JSON.stringify(error.message);
//   }
// }
