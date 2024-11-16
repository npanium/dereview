// components/dashboard/paper-card.tsx
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface PaperCardProps {
  title: string;
  description: string;
  tags: string[];
  status: string;
}

export default function PaperCard({
  title,
  description,
  tags,
  status,
}: PaperCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Badge variant="outline">{status}</Badge>
          <Button variant="outline">View Details</Button>
        </div>
      </CardContent>
    </Card>
  );
}
