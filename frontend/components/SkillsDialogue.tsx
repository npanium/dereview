"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock skills data - replace with your actual skills data
const AVAILABLE_SKILLS = [
  "Machine Learning",
  "Deep Learning",
  "Natural Language Processing",
  "Computer Vision",
  "Quantum Computing",
  "Blockchain",
  "Cryptography",
  "Distributed Systems",
  "Cloud Computing",
  "Data Science",
  "Statistics",
  "Mathematics",
  "Algorithms",
  "Software Engineering",
  "Web Development",
] as const;

interface SkillsDialogProps {
  existingSkills?: string[];
  onSkillsUpdate: (skills: string[]) => void;
}

export default function SkillsDialog({
  existingSkills = [],
  onSkillsUpdate,
}: SkillsDialogProps) {
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(
    new Set(existingSkills)
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleSkill = (skill: string) => {
    const newSkills = new Set(selectedSkills);
    if (newSkills.has(skill)) {
      newSkills.delete(skill);
    } else {
      newSkills.add(skill);
    }
    setSelectedSkills(newSkills);
  };

  const handleSave = () => {
    onSkillsUpdate(Array.from(selectedSkills));
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-[#432d5e] text-[#432d5e] hover:bg-[#432d5e] hover:text-white"
        >
          Update Skills
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#432d5e]">Update Skills</DialogTitle>
          <DialogDescription className="">
            Select your areas of expertise. Click a skill to select or deselect
            it.
          </DialogDescription>
        </DialogHeader>

        <div className="my-6">
          <h4 className="mb-4 text-sm font-medium text-[#432d5e]">
            Selected Skills
          </h4>
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedSkills.size === 0 ? (
              <span className="text-sm text-gray-500">No skills selected</span>
            ) : (
              Array.from(selectedSkills).map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-[#432d5e] text-white hover:bg-[#523d6e]"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                  <span className="ml-1 cursor-pointer">×</span>
                </Badge>
              ))
            )}
          </div>

          <h4 className="mb-4 text-sm font-medium text-[#432d5e]">
            Available Skills
          </h4>
          <ScrollArea className="h-[200px] rounded-md border border-gray-800 p-4">
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SKILLS.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className={`cursor-pointer transition-colors ${
                    selectedSkills.has(skill)
                      ? "bg-[#432d5e] text-white border-[#432d5e]"
                      : "border-gray-600 text-gray-800 hover:bg-[#432d5e] hover:text-white "
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="bg-[#432d5e] hover:bg-[#523d6e] text-white"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
