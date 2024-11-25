"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { Link2, Coins, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useAccount } from "wagmi";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { parseEther } from "viem";
import ReviewPoolFactory from "@/lib/abi/ReviewPoolFactory.json";
import reviewerSBTAbi from "@/lib/abi/ReviewerSBT.json";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FileUpload from "./FileUpload";

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters",
    })
    .max(200, {
      message: "Title cannot exceed 200 characters",
    }),
  topic: z
    .string()
    .min(2, {
      message: "Topic must be at least 2 characters",
    })
    .max(100, {
      message: "Topic cannot exceed 100 characters",
    }),
  bounty: z
    .number()
    .min(0.01, { message: "Minimum bounty is 0.01 ETH" })
    .max(100, { message: "Maximum bounty is 100 ETH" })
    .refine((val) => !isNaN(val), {
      message: "Please enter a valid number",
    }),
  reviewersCount: z
    .number()
    .int()
    .min(1, { message: "Minimum 1 reviewer required" })
    .max(10, { message: "Maximum 10 reviewers allowed" })
    .refine((val) => !isNaN(val), {
      message: "Please enter a valid number",
    }),
});

type PaperSubmissionForm = z.infer<typeof formSchema>;
interface SubmitPaperFormProps {
  onSuccess?: () => void;
}

export default function SubmitPaperForm({ onSuccess }: SubmitPaperFormProps) {
  const [ipfsLink, setIpfsLink] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { address } = useAccount();
  const { data: hash, isSuccess, writeContract } = useWriteContract();
  const { data: receipt, isSuccess: receiptSuccess } =
    useWaitForTransactionReceipt();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      topic: "",
      bounty: 0.01,
      reviewersCount: 3,
    },
  });

  const { data: skillsList } = useReadContract({
    address: process.env.NEXT_PUBLIC_REVIEWER_SBT_ADDRESS as `0x${string}`,
    abi: reviewerSBTAbi.abi,
    functionName: "getAllTagTypes",
    args: [],
  });
  const topic = form.watch("topic");
  console.log("topic", topic);

  const { data: tagHash } = useReadContract({
    address: process.env.NEXT_PUBLIC_REVIEWER_SBT_ADDRESS as `0x${string}`,
    abi: reviewerSBTAbi.abi,
    functionName: "tagTypesHash",
    args: [topic],
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values", values);
    console.log("ipfsLink", ipfsLink);
    console.log("tagHash", tagHash);
    if (!ipfsLink) {
      toast({
        title: "❌ Error",
        variant: "destructive",
        description: "Please upload your paper first",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      if (!tagHash) {
        toast({
          title: "❌ Error",
          variant: "destructive",
          description: "Invalid topic selected",
        });
        return;
      }

      writeContract({
        address: process.env
          .NEXT_PUBLIC_REVIEW_POOL_FACTORY_ADDRESS as `0x${string}`,
        abi: ReviewPoolFactory.abi,
        functionName: "createReviewPool",
        args: [tagHash, ipfsLink, values.title, BigInt(values.reviewersCount)],
        value: parseEther(values.bounty.toString()),
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "❌ Error",
        variant: "destructive",
        description: "Failed to submit paper",
      });
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (hash !== undefined) {
      toast({
        title: "Creating Peer Review Pool",
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
    if (receiptSuccess) {
      toast({
        title: "✅ Peer Review Pool Created",
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
      setIsSubmitting(false);
    }
  }, [receiptSuccess]);
  return (
    <Card className="w-full max-w-3xl mx-auto border-gray-800 ">
      <CardHeader>
        <CardTitle className="font-heading text-2xl">
          Submit Paper for Review
        </CardTitle>
        <CardDescription>
          Get your research paper reviewed by experts in your field
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the title of your paper"
                      {...field}
                      className=" border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Topic</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="border-gray-700">
                        <SelectValue placeholder="Select a research topic" />
                      </SelectTrigger>
                      <SelectContent>
                        {skillsList !== undefined &&
                          (skillsList as Array<string>).map((skill: string) => (
                            <SelectItem key={skill} value={skill}>
                              {skill}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Main research area of your paper
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FileUpload setPaperLink={setIpfsLink} />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="bounty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bounty Amount (ETH)</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Coins className="h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          step="0.01"
                          {...field}
                          className=" border-gray-700"
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      Total bounty to be split among reviewers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reviewersCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Reviewers</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          min={1}
                          max={10}
                          value={field.value}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value)) {
                              // Clamp value between 1 and 10
                              const clampedValue = Math.min(
                                Math.max(value, 1),
                                10
                              );
                              field.onChange(clampedValue);
                            }
                          }}
                          className=" border-gray-700 w-20"
                        />
                      </div>
                    </FormControl>

                    <FormDescription>
                      Choose between 1-10 reviewers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* <FormField
              control={form.control}
              name="abstract"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abstract</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full min-h-[100px] rounded-md border  border-gray-700 p-3"
                      placeholder="Briefly describe your paper..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <Button
              type="submit"
              className="w-full bg-[#432d5e] hover:bg-[#523d6e]"
              disabled={isSubmitting || !ipfsLink}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-pulse">Submitting...</span>
                </>
              ) : (
                "Submit Paper for Review"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
