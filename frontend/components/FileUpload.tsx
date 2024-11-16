"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function FileUpload() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ipfsLink, setIpfsLink] = useState<string | null>(null);

  const getTimestampedFileName = (originalName: string) => {
    const timestamp = new Date()
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "_")
      .slice(0, -5);

    const extension = originalName.split(".").pop();
    return `${timestamp}.${extension}`;
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select a file first",
      });
      return;
    }

    setIsUploading(true);
    setIpfsLink(null); // Reset previous IPFS link

    try {
      const newFileName = getTimestampedFileName(selectedFile.name);
      const renamedFile = new File([selectedFile], newFileName, {
        type: selectedFile.type,
      });

      const formData = new FormData();
      formData.append("file", renamedFile);

      const response = await fetch(
        "http://3.10.209.79:8000/buckets/dereview/files",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();

      // Extract IPFS CID and create IPFS link
      const rootCID = result.data.RootCID;
      const ipfsUrl = `https://ipfs.io/ipfs/${rootCID}`;
      setIpfsLink(ipfsUrl);

      console.log("File Name:", result.data.Name);
      console.log("IPFS CID:", rootCID);
      console.log("IPFS URL:", ipfsUrl);

      toast({
        title: "Success",
        description: "File uploaded and stored on IPFS",
        className: "bg-green-800 border-green-900",
      });

      setSelectedFile(null);
      const fileInput = document.getElementById(
        "file-upload"
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Upload Failed",
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleFileUpload} className="space-y-4">
        <div className="flex items-center gap-4">
          <Input
            id="file-upload"
            type="file"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="text-black border-gray-700"
            accept=".pdf"
          />
          <Button
            type="submit"
            disabled={!selectedFile || isUploading}
            className="bg-[#432d5e] hover:bg-[#523d6e] min-w-[100px]"
          >
            {isUploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </>
            )}
          </Button>
        </div>
        {selectedFile && (
          <p className="text-sm text-gray-400">
            Selected file: {selectedFile.name}
          </p>
        )}
      </form>

      {ipfsLink && (
        <div className="p-4 bg-gray-800 rounded-md">
          <p className="text-sm font-medium text-gray-200 mb-2">IPFS Link:</p>
          <a
            href={ipfsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-400 hover:text-blue-300 break-all"
          >
            {ipfsLink}
          </a>
        </div>
      )}
    </div>
  );
}
