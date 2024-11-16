import ReviewerCard from "@/components/dashboard/reviewer-card";
import { mockReviewers } from "@/lib/mock-data";

export default function ReviewerDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#432d5e]">
        Available Papers
      </h2>
      <div className="grid gap-4">
        {mockReviewers.map((reviewer) => (
          <ReviewerCard key={reviewer.id} {...reviewer} />
        ))}
      </div>
    </div>
  );
}
