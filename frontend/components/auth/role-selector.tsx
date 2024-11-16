"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText, UserCircle } from "lucide-react";

export default function RoleSelector() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gray-900">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#432d5e]">
          DeReview
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:border-[#432d5e] transition-all"
            onClick={() => router.push("/dashboard/researcher")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Researcher
              </CardTitle>
              <CardDescription>
                Submit and track your research papers
              </CardDescription>
            </CardHeader>
          </Card>

          <Card
            className="cursor-pointer hover:border-[#432d5e] transition-all"
            onClick={() => router.push("/dashboard/reviewer")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-6 w-6" />
                Reviewer
              </CardTitle>
              <CardDescription>
                Review papers in your area of expertise
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
