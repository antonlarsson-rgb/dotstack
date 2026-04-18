export function SlideShell({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`slide flex items-center justify-center px-16 py-24 ${className}`}
    >
      <div className="max-w-[1080px] w-full">{children}</div>
    </section>
  );
}
