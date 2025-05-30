const Path = ({ opacity = 0 }: { opacity?: number }) => {
  const size = `${10 + 15 * opacity}%`;

  return (
    <div
      className="border-2 border-[#eeeeee] bg-[#eeeeee] rounded-[50%]"
      style={{
        opacity,
        width: size,
        height: size,
        boxShadow: "0 0 4px #eeeeee80, 0 0 8px #eeeeee80",
      }}
    />
  );
};

export default Path;
