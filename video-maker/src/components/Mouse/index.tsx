const Mouse = ({ opacity = 0 }: { opacity?: number }) => (
  <div
    className="w-[50%] h-[50%] border-2 border-[#f39600] bg-[#f39600] rounded-[50%]"
    style={{
      opacity,
      boxShadow:
        "0 0 4px #f39600, inset 0 0 4px #f39600, 0 0 8px #f39600, inset 0 0 8px #f39600",
    }}
  />
);

export default Mouse;
