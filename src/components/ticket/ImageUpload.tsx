import { Trash2, Upload } from "lucide-react";
import type { ChangeEvent } from "react";

interface ImageUploadProps {
  images: File[];
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

/**
 * Component untuk upload dan preview gambar tiket
 */
export default function ImageUpload({
  images,
  onImageChange,
  onRemoveImage,
}: ImageUploadProps) {
  return (
    <div className="mt-5 border-t border-border pt-5">
      <label className="mb-4 block text-sm text-gray-500">Kumpulan Foto</label>

      <div className="flex flex-wrap gap-3">
        {/* UPLOAD BUTTON */}
        <label
          className="
            flex
            h-40
            w-40
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-border
            bg-white
            transition
            hover:bg-gray-50
          "
        >
          <Upload size={28} className="text-gray-500" />
          <span className="mt-3 text-sm text-gray-500">Unggah gambar</span>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="hidden"
            onChange={onImageChange}
          />
        </label>

        {/* IMAGE PREVIEW */}
        {images.map((image, index) => (
          <div
            key={`${image.name}-${image.lastModified}-${index}`}
            className="
              relative
              h-40
              w-40
              overflow-hidden
              rounded-2xl
              border
              border-border
              bg-gray-100
            "
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Gambar ${index + 1}`}
              className="
                h-full
                w-full
                object-cover
              "
            />

            <button
              type="button"
              onClick={() => onRemoveImage(index)}
              className="
                absolute
                right-2
                top-2
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                bg-white
                text-danger
                shadow
                transition
                hover:bg-gray-100
              "
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      <p className="mt-2 text-xs text-gray-400">Format JPG, PNG, atau WEBP.</p>
    </div>
  );
}
