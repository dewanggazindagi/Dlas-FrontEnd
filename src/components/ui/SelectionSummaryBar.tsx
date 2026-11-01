import Button from "./Button";

interface Props {
  count: number;
  onEdit: () => void;
  className?: string;
}

export default function SelectionSummaryBar({ count, onEdit, className = "" }: Props) {
  return (
    <div
      className={`flex w-full items-stretch gap-1.5 rounded-full border border-border bg-white p-2 drop-shadow-[2px_3px_7px_rgba(0,0,0,0.05)] md:w-[742px] ${className}`}
    >
      <div className="flex flex-1 items-center gap-1 self-stretch rounded-full bg-white px-5 py-1.5">
        <p className="text-t4 font-medium text-black">{count}</p>
        <p className="text-t4 font-medium text-black">Wahana Ingin Dikunjungi</p>
      </div>
      <Button variant="primary" onClick={onEdit} className="shrink-0">
        Edit
      </Button>
    </div>
  );
}
