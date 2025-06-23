export const Source = ({ text }: { text: string }) => (
  <p
    className="absolute text-right text-2xl font-light text-[#eeeeee]"
    style={{ maxWidth: "45%", bottom: "1rem", right: "1rem" }}
  >
    {text}
  </p>
);
