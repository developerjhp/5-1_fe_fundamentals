interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, children, className }: FormFieldProps) {
  return (
    <div className={`form-field ${className ?? ''}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}
