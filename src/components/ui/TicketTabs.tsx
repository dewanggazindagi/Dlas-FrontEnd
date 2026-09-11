export type TicketTab = "paket-hemat" | "regular";

interface Props {
  activeTab: TicketTab;
  onChange: (tab: TicketTab) => void;
  className?: string;
}

const tabs: { id: TicketTab; label: string }[] = [
  { id: "paket-hemat", label: "Tiket Paket Hemat" },
  { id: "regular", label: "Tiket Regular" },
];

export default function TicketTabs({ activeTab, onChange, className = "" }: Props) {
  return (
    <div
      className={`flex w-full items-start justify-center gap-1 rounded-full border border-border bg-white p-1 drop-shadow-[2px_3px_7px_rgba(0,0,0,0.05)] md:w-[740px] ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={`flex flex-1 items-center justify-center gap-2.5 rounded-full px-4 py-2.5 text-t4 ${
            activeTab === tab.id
              ? "border border-border bg-soft-gray font-semibold text-black"
              : "cursor-pointer font-medium text-black"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
