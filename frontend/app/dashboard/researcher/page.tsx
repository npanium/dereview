import AddPaperDialog from "@/components/AddPaperDialog";
import PaperCard from "@/components/dashboard/paper-card";
import { Button } from "@/components/ui/button";
import { mockPapers } from "@/lib/mock-data";

export default function ResearcherDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#432d5e]">My Papers</h2>
      <div className="grid gap-4">
        {mockPapers.map((paper) => (
          <PaperCard key={paper.id} {...paper} />
        ))}
      </div>
      {/* <Button className="bg-[#432d5e]"> Add paper </Button> */}
      <AddPaperDialog />
    </div>
  );
}
