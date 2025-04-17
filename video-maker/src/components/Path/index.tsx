const Path = ({ opacity = 0 }: { opacity?: number }) => (
  <div
    className="w-[20%] h-[20%] border-2 border-[#eeeeee] rounded-[50%]"
    style={{
      opacity,
      boxShadow: "0 0 4px #eeeeee80, 0 0 8px #eeeeee80",
    }}
  />
);

export default Path;
