// Neutral box shown where the business has not uploaded an image yet.
export function ImagePlaceholder({
  className = "relative",
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex items-center justify-center bg-photo ${className}`}
    >
      <span className="size-12 rounded-full bg-line" />
    </div>
  );
}
