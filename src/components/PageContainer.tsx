import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-1 pt-24">
        <div className="container mx-auto max-w-4xl">{children}</div>
      </div>
    </div>
  );
};
