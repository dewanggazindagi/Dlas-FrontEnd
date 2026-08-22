interface Props {
  title: string;
  description: string;
  className?: string;
}

export default function SectionHeading({ title, description, className = "" }: Props) {
  return (
    <div className={`flex flex-col items-center gap-4 text-center ${className}`}>
      <h2 className="text-h7 font-semibold text-black capitalize md:text-h2">{title}</h2>
      <p className="max-w-[622px] text-t5 text-dark-gray md:text-t3">{description}</p>
    </div>
  );
}
