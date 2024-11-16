"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { useState } from "react";
import SubmitPaperForm from "./SubmitPaperForm"; // your existing form component
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import router from "next/router";

export default function AddPaperDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* <Button className="bg-[#432d5e] hover:bg-[#523d6e]">
          <Plus className="mr-2 h-4 w-4" /> Add Paper
        </Button> */}
        <Card
          className="cursor-pointer hover:border-[#432d5e] transition-all"
          // onClick={() => router.push("/dashboard/researcher")}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Request Review
            </CardTitle>
            <CardDescription>
              Submit and ask for reviews on your research papers
            </CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-gray-800">
        <SubmitPaperForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
