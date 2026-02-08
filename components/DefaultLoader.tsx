import { Loader2 } from "lucide-react";
import React from "react";

const DefaultLoader = ({ title }: { title: string }) => {
  return (
    <div>
      <div className="py-20 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-emerald-500 animate-spin mb-4" />
        <p className="text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default DefaultLoader;
