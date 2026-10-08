interface ErrorAlertProps {
  error: string;
}

/**
 * Component untuk menampilkan pesan error
 */
export default function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div
      className="
        mt-6
        rounded-xl
        bg-red-50
        px-5
        py-3
        text-sm
        text-red-500
      "
    >
      {error}
    </div>
  );
}
