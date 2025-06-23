export const Highlight = ({ x, y }: { x: string; y: string }) => {
  return (
    <div
      className="absolute w-32 h-32 border-8 border-[#8ae013] rounded-[50%]"
      style={{
        left: x,
        top: y,
        filter: "drop-shadow(0 0 32px #8ae013)",
      }}
    />
  );
};
