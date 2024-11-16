"use client";

import { File } from "@/lib/types";
import { downloadFile } from "@/lib/actions";

export function FileList({ files = [] }: { files: File[] }) {
  async function handleDownload(fileName: string) {
    const result = await downloadFile(fileName);

    if (result.success && result.data instanceof Blob) {
      const url = window.URL.createObjectURL(result.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      alert("Failed to download file");
    }
  }

  if (files.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No files uploaded yet
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {files.map((file) => (
        <div
          key={file.fileName}
          className="p-4 border rounded flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{file.fileName}</h3>
            <p className="text-sm text-gray-500">
              Size: {(file.size / 1024).toFixed(2)} KB
            </p>
            {file.uploadedAt && (
              <p className="text-sm text-gray-500">
                Uploaded: {new Date(file.uploadedAt).toLocaleDateString()}
              </p>
            )}
          </div>
          <button
            onClick={() => handleDownload(file.fileName)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
}
