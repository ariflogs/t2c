export const CodeOutput = ({ output }: { output: string[] }) => {
  const outputString = output.join("\n");

  return (
    <textarea
      className=" h-full w-full rounded-md bg-gray-900 px-6 py-8 text-green-500"
      value={`Output :\n${outputString}`}
      disabled
    ></textarea>
  );
};
