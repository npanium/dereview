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
import SubmitReviewForm from "./SubmitReviewForm";

export default function AddReviewDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          // onClick={() => console.log("Submit review")}
          className="bg-[#432d5e] hover:bg-[#523d6e]"
        >
          Submit Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto border-gray-800">
        <SubmitReviewForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
