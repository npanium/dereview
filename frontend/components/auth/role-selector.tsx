"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FileText, UserCircle } from "lucide-react";
import { useState } from "react";
import SkillsDialog from "@/components/SkillsDialogue";
import AddPaperDialog from "../AddPaperDialog";

export default function RoleSelector() {
  const router = useRouter();
  const [userSkills, setUserSkills] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-center justify-center my-32 ">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#432d5e]">
          DeReview
        </h1>

        <SkillsDialog
          existingSkills={userSkills}
          onSkillsUpdate={setUserSkills}
          hidden={true}
        />
        <div className="grid md:grid-cols-2 gap-6">
          {/* <Card
            className="cursor-pointer hover:border-[#432d5e] transition-all"
            onClick={() => router.push("/dashboard/researcher")}
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
          </Card> */}
          <AddPaperDialog />
          <Card
            className="cursor-pointer hover:border-[#432d5e] transition-all"
            onClick={() => router.push("/dashboard/reviewer")}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-6 w-6" />
                Dashboard
              </CardTitle>
              <CardDescription>
                Look for available papers for review in your area of expertise
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
