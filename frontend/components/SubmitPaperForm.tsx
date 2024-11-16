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
import { Link2, Coins, Users } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
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
  paperLink: z.string().url({
    message: "Please enter a valid URL starting with http:// or https://",
  }),
  bounty: z
    .number()
    .min(0.1, { message: "Minimum bounty is 0.1 ETH" })
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
  //   abstract: z
  //     .string()
  //     .min(50, { message: "Abstract must be at least 50 characters" })
  //     .max(5000, { message: "Abstract cannot exceed 5000 characters" }),
});

type PaperSubmissionForm = z.infer<typeof formSchema>;
interface SubmitPaperFormProps {
  onSuccess?: () => void;
}

export default function SubmitPaperForm({ onSuccess }: SubmitPaperFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      topic: "",
      paperLink: "",
      bounty: 0.1,
      reviewersCount: 3,
      //   abstract: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      console.log(values);
      // Your submission logic here

      // Call onSuccess callback to close the dialog
      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }
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
                    <Input
                      placeholder="e.g., Machine Learning, Cryptography"
                      {...field}
                      className=" border-gray-700"
                    />
                  </FormControl>
                  <FormDescription>
                    Main research area of your paper
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paperLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paper Link</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Input
                        placeholder="https://..."
                        {...field}
                        className=" border-gray-700"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        className="border-gray-700 hover:"
                      >
                        <Link2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Link to your paper (IPFS, arXiv, or other permanent URL)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                          step="0.1"
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
              disabled={isSubmitting}
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