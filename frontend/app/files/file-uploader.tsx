"use client";

import { useState } from "react";
import { uploadFile } from "@/lib/actions";

export function FileUploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check minimum file size (127 bytes as per documentation)
    if (file.size < 127) {
      alert("File must be at least 127 bytes");
      return;
    }

    // Check maximum file size (100MB as per documentation)
    if (file.size > 100 * 1024 * 1024) {
      alert("File must be less than 100MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsLoading(true);
    const result = await uploadFile(formData);
    setIsLoading(false);

    if (!result.success) {
      alert("Failed to upload file");
    }
  }

  return (
    <div className="mb-6">
      <input
        type="file"
        onChange={handleFileChange}
        disabled={isLoading}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />
      {isLoading && <div className="mt-2">Uploading...</div>}
    </div>
  );
}
