import type { BaseTableProps } from "../tables/types";

export default function BaseTable<T extends Record<string, unknown>>({
  columns,
  data,
  toolbar,
  pagination,
  emptyMessage = "Data tidak tersedia.",
}: BaseTableProps<T>) {
  const align = (value?: "left" | "center" | "right") => {
    switch (value) {
      case "center":
        return "text-center";

      case "right":
        return "text-right";

      default:
        return "text-left";
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      {toolbar && <div className="border-b border-gray-100 p-5">{toolbar}</div>}

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="border-b border-gray-100">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  style={{ width: column.width }}
                  className={`border-b border-gray-100 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-500 ${align(
                    column.align,
                  )}`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ?
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-12 text-center text-gray-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            : data.map((row, index) => (
                <tr key={index} className="transition hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={String(column.key)}
                      className={`border-b border-gray-100 px-6 py-5 text-sm text-gray-800 ${align(
                        column.align,
                      )}`}
                    >
                      {column.render ?
                        column.render(row)
                      : String(row[column.key])}
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>

      {pagination && (
        <div className="border-t border-gray-100 p-5">{pagination}</div>
      )}
    </div>
  );
}
