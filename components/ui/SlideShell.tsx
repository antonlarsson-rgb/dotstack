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
      className={`slide flex items-start md:items-center justify-center pt-16 pb-12 md:py-24 ${className}`}
    >
      <div className="max-w-[1080px] w-full">{children}</div>
    </section>
  );
}
