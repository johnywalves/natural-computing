const Mouse = ({ opacity = 0 }: { opacity?: number }) => (
  <div
    className="w-[40%] h-[40%] border-2 border-[#f39600] rounded-[50%]"
    style={{
      opacity,
      boxShadow:
        "0 0 4px #f3960080, inset 0 0 4px #f3960080, 0 0 8px #f3960080, inset 0 0 8px #f3960080",
    }}
  />
);

export default Mouse;
