function FormError({ className, children }) {
  return <p className={`text-sm text-red-500 mt-1 ${className}`}>{children}</p>
}

export { FormError }
