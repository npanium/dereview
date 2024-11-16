"use server";

import { revalidatePath } from "next/cache";
import { AKAVE_API_URL } from "./config";
import { ApiResponse } from "./types";

// Ideally- Using wallet address as bucket name
const BUCKET_NAME = "default-bucket";

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
  return response.json();
}

export async function uploadFile(formData: FormData) {
  try {
    const response = await fetch(
      `${AKAVE_API_URL}/buckets/${BUCKET_NAME}/files`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await handleResponse(response);
    revalidatePath(`/files`);
    return { success: true, data: result };
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, error: "Failed to upload file" };
  }
}

export async function listFiles(): Promise<ApiResponse<File[]>> {
  try {
    const response = await fetch(
      `${AKAVE_API_URL}/buckets/${BUCKET_NAME}/files`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch files");
    }
    const data = await response.json();
    // Ensure we return an array even if the API returns null/undefined
    return { success: true, data: Array.isArray(data) ? data : [] };
  } catch (error) {
    console.error("List files error:", error);
    return { success: false, error: "Failed to list files", data: [] };
  }
}

export async function downloadFile(
  fileName: string
): Promise<ApiResponse<Blob>> {
  try {
    const response = await fetch(
      `${AKAVE_API_URL}/buckets/${BUCKET_NAME}/files/${fileName}/download`
    );

    if (!response.ok) {
      throw new Error("Download failed");
    }

    const blob = await response.blob();
    return { success: true, data: blob };
  } catch (error) {
    console.error("Download error:", error);
    return { success: false, error: "Failed to download file" };
  }
}
