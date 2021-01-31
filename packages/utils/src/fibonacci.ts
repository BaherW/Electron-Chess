export function fibonacci(n: number): number {
  if (n < 0) {
    throw new Error('Can\'t compute the fibonacci number of a negative index')
  }

  if (n < 2) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}