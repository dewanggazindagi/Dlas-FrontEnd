import { useState } from "react";
import type { ChangeEvent } from "react";
import type { TicketForm, TextField } from "../types/ticket";

const initialFormState: TicketForm = {
  name: "",
  weekdayPrice: "",
  weekendPrice: "",
  status: "",
  description: "",
  selectedItems: [],
  terms: [""],
  images: [],
};

/**
 * Hook untuk mengelola state form tiket
 */
export const useTicketForm = () => {
  const [form, setForm] = useState<TicketForm>(initialFormState);

  const handleChange = (field: TextField, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files?.length) {
      return;
    }

    const selectedFiles = Array.from(files);
    setForm((prev) => ({
      ...prev,
      images: [...prev.images, ...selectedFiles],
    }));

    event.target.value = "";
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, imageIndex) => imageIndex !== index),
    }));
  };

  const handleToggleItem = (id: string) => {
    setForm((prev) => {
      const exists = prev.selectedItems.includes(id);
      return {
        ...prev,
        selectedItems: exists
          ? prev.selectedItems.filter((item) => item !== id)
          : [...prev.selectedItems, id],
      };
    });
  };

  const handleAddTerm = () => {
    setForm((prev) => ({
      ...prev,
      terms: [...prev.terms, ""],
    }));
  };

  const handleTermChange = (index: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      terms: prev.terms.map((term, itemIndex) =>
        itemIndex === index ? value : term
      ),
    }));
  };

  const handleRemoveTerm = (index: number) => {
    setForm((prev) => {
      const terms = prev.terms.filter((_, itemIndex) => itemIndex !== index);
      return {
        ...prev,
        terms: terms.length > 0 ? terms : [""],
      };
    });
  };

  const resetForm = () => {
    setForm(initialFormState);
  };

  return {
    form,
    setForm,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    handleToggleItem,
    handleAddTerm,
    handleTermChange,
    handleRemoveTerm,
    resetForm,
  };
};