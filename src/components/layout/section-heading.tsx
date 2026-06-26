interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <p className="text-sm font-medium tracking-widest text-blue-400 uppercase">
        {label}
      </p>
      <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">{description}</p>
      )}
    </div>
  );
}
