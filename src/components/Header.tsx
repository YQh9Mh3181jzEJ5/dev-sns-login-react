import { Button } from "@/components/ui/button";

interface HeaderProps {
  onSignout: () => void;
}

export function Header({ onSignout }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-white">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-800">SNS APP</h1>
          <Button variant="outline" onClick={onSignout}>
            ログアウト
          </Button>
        </div>
      </div>
    </header>
  );
}
