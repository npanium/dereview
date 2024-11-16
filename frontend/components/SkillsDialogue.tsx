"use client";
import { useState, useEffect } from "react";
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
import {
  useReadContract,
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt,
} from "wagmi";
import reviewerSBTAbi from "@/lib/abi/ReviewerSBT.json";
import { useToast } from "@/hooks/use-toast";

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
  hidden?: boolean;
  onSkillsUpdate: (skills: string[]) => void;
}

export default function SkillsDialog({
  existingSkills = [],
  onSkillsUpdate,
  hidden = false,
}: SkillsDialogProps) {
  const [selectedSkills, setSelectedSkills] = useState<Set<string>>(
    new Set(existingSkills)
  );
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const { address } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const {
    data: receipt,
    isLoading,
    isSuccess,
  } = useWaitForTransactionReceipt({ hash });

  const { data: reviewerSBT } = useReadContract({
    address: process.env.NEXT_PUBLIC_REVIEWER_SBT_ADDRESS as `0x${string}`,
    abi: reviewerSBTAbi.abi,
    functionName: "balanceOf",
    args: [address],
  });

  const { data: skillsList } = useReadContract({
    address: process.env.NEXT_PUBLIC_REVIEWER_SBT_ADDRESS as `0x${string}`,
    abi: reviewerSBTAbi.abi,
    functionName: "getAllTagTypes",
    args: [],
  });

  console.log(reviewerSBT);

  const toggleSkill = (skill: string) => {
    const newSkills = new Set<string>();
    if (selectedSkills.has(skill)) {
      newSkills.clear();
    } else {
      newSkills.add(skill);
    }
    setSelectedSkills(newSkills);
  };

  const handleSave = async () => {
    if (reviewerSBT !== 0) {
      setLoading(true);
      try {
        writeContract({
          address: process.env.NEXT_PUBLIC_REVIEWER_SBT_ADDRESS as `0x${string}`,
          abi: reviewerSBTAbi.abi,
          functionName: "mint",
          args: [address, Array.from(selectedSkills)],
        });
      } catch (error) {
        console.error(error);
        toast({
          title: "❌ Error minting skills credential",
          description: "Please try again later",
        });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (reviewerSBT !== undefined && Number(reviewerSBT) === 0) {
      setIsOpen(true);
    }
  }, [reviewerSBT]);

  useEffect(() => {
    if (hash !== undefined) {
      toast({
        title: "Minting skills credentials",
        description: (
          <span>
            Check tx on{" "}
            <a
              href={`https://base-sepolia.blockscout.com/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 hover:text-blue-600"
            >
              Blockscout
            </a>
          </span>
        ),
      });
    }
  }, [hash]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "✅ Skills Credential Minted",
        description: (
          <span>
            See your credential on{" "}
            <a
              href={`https://base-sepolia.blockscout.com/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-500 hover:text-blue-600"
            >
              Blockscout
            </a>
          </span>
        ),
      });
      setLoading(false);
    }
    setIsOpen(false);
  }, [receipt]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={`${hidden ? "hidden" : "border-[#432d5e] text-[#432d5e] hover:bg-[#432d5e] hover:text-white"}`}
        >
          Add Skills
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-[#432d5e]">Add Skills</DialogTitle>
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
              {skillsList !== undefined ? (
                (skillsList as Array<string>).map((skill: string) => (
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
                ))
              ) : (
                <span className="text-sm text-gray-500">No skills found</span>
              )}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button
            type="submit"
            className="bg-[#432d5e] hover:bg-[#523d6e] text-white"
            onClick={() => handleSave()}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Minting...
              </div>
            ) : (
              "Mint Credential"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
