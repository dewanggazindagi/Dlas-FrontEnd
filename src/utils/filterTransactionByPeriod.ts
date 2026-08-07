export function filterTransactionByPeriod<T extends { date: string }>(
  data: T[],
  period: string
) {
  const now = new Date();

  return data.filter((item) => {
    const itemDate = new Date(item.date);

    switch (period) {
      case "today":
        return itemDate.toDateString() === now.toDateString();

      case "week": {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        return itemDate >= weekAgo;
      }

      case "month":
        return (
          itemDate.getMonth() === now.getMonth() &&
          itemDate.getFullYear() === now.getFullYear()
        );

      case "year":
      default:
        return itemDate.getFullYear() === now.getFullYear();
    }
  });
}