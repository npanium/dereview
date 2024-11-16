import { listFiles } from "@/lib/actions";
import { FileUploader } from "./file-uploader";
import { FileList } from "./file-list";
import FileUpload from "@/components/FileUpload";
// import { WALLET_ADDRESS } from '@/lib/config';

export default async function FilesPage() {
  const { data: files = [], error } = await listFiles();

  //   if (!WALLET_ADDRESS) {
  //     return (
  //       <div className="p-8">
  //         <h1 className="text-2xl font-bold text-red-500">
  //           Wallet address not configured
  //         </h1>
  //         <p className="mt-4">
  //           Please set NEXT_PUBLIC_WALLET_ADDRESS in your environment variables.
  //         </p>
  //       </div>
  //     );
  //   }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Files Storage</h1>

      <FileUpload />
      {/* {error ? (
        <div className="text-red-500 mt-4">{error}</div>
      ) : (
        <FileList files={files} />
      )} */}
    </div>
  );
}
