// export interface Bucket {
//   bucketName: string;
//   createdAt?: string;
//   size?: number;
// }

// export interface File {
//   fileName: string;
//   size: number;
//   uploadedAt: string;
// }

export interface File {
  fileName: string;
  size: number;
  uploadedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
