import { Slider } from "@/components/ui/slider";

export default function SliderMarks({ marks }: { marks: string[] }) {

  return (
    <div className="w-full max-w-sm">
      <Slider defaultValue={[1]} max={marks.length} step={1} />
      <div className="mt-2 -mx-1.5 flex items-center justify-between text-muted-foreground text-xs">
        {marks.map((expansion) => (
          <span key={expansion}>{expansion}</span>
        ))}
      </div>
    </div>
  );
}
