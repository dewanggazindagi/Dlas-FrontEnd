import DateSearchBar from "./DateSearchBar";

interface Props {
  selectedDate?: Date;
  onDateChange: (date?: Date) => void;
  onSearch: () => void;
}

export default function BookingBar({ selectedDate, onDateChange, onSearch }: Props) {
  return (
    <div className="sticky top-4 z-30 mx-auto -mt-7 flex w-full justify-center px-4 md:-mt-8 md:px-0">
      <DateSearchBar selectedDate={selectedDate} onDateChange={onDateChange} onSearch={onSearch} />
    </div>
  );
}
