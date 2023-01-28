import type { Dispatch, SetStateAction } from "react";

export const CodeEditor = ({
  code,
  setCode,
}: {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <textarea
      className=" h-full w-full rounded-md bg-gray-900 px-6 py-8 text-gray-300"
      value={code}
      onChange={(e) => setCode(e.target.value)}
    ></textarea>
  );
};
