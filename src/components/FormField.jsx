export default function FormField({
  label,
  name,
  type = "text",
  as = "input",
  value,
  onChange,
  error,
  required = true,
  rows = 5,
  placeholder,
}) {
  const Component = as;
  const fieldId = `contact-${name}`;

  return (
    <div>
      <label htmlFor={fieldId} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-cyan-soft"> *</span>}
      </label>
      <Component
        id={fieldId}
        name={name}
        type={as === "input" ? type : undefined}
        rows={as === "textarea" ? rows : undefined}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${fieldId}-error` : undefined}
        className={`w-full rounded-xl border bg-surface/70 px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors duration-200 focus-visible:outline-none focus-visible:border-cyan-soft/60 ${
          error ? "border-[#ef7f6f]/60" : "border-border"
        }`}
      />
      {error && (
        <p id={`${fieldId}-error`} className="mt-1.5 text-xs text-[#ef7f6f]">
          {error}
        </p>
      )}
    </div>
  );
}
