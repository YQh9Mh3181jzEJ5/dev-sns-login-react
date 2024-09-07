import { Button } from "@/components/ui/button";

interface PaginationProps {
  onPrev: (() => void) | null;
  onNext: (() => void) | null;
}

export function Pagination({ onPrev, onNext }: PaginationProps) {
  const handlePrev: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (onPrev) onPrev();
  };

  const handleNext: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (onNext) onNext();
  };
  return (
    <div className="flex justify-center mt-4">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrev ? handlePrev : undefined}
        disabled={onPrev === null}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="ml-2"
        onClick={onNext ? handleNext : undefined}
        disabled={onNext === null}
      >
        Next
      </Button>
    </div>
  );
}
