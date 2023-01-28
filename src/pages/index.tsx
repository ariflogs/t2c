/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import * as Tesseract from "tesseract.js";

import { CodeEditor } from "../components/CodeEditor";
import { CodeOutput } from "../components/CodeOutput";
import Footer from "../layout/footer";

const Home: NextPage = () => {
  const [code, setCode] = useState<string>(
    `function add(a, b) {\n  return a + b;\n}\nconsole.log(add(2, 2))`
  );
  const [output, setOutput] = useState<any[]>([]);
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const runCode = () => {
    const originalLog = console.log;

    const response: any[] = [];
    console.log = function (...value) {
      originalLog.apply(console, value);
      response.push(...value);
    };

    eval(code) as string[];
    setOutput(response);
  };

  const onImageUpload = async () => {
    try {
      setLoading(true);
      const worker = await Tesseract.createWorker();

      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const { data } = await worker.recognize(fileUrl);
      if (typeof data.text === "string") {
        setCode(data.text as string);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>T2Code</title>
        <meta name="description" content="Test Temporary Code" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-gray-800 px-4">
        <div className="h-full w-full">
          <div className="flex justify-between py-4">
            <span className="w-2/3 text-sm text-red-400">
              FYI, currently you can only run JavaScript! 🥲
            </span>
            <span className="flex w-1/3">
              <input
                type="search"
                id="search"
                className="mr-2 block w-2/3 rounded border border-gray-300 bg-transparent p-2 text-sm text-white"
                placeholder="Image URL"
                required
                value={fileUrl}
                onChange={(e) => setFileUrl(e.target.value)}
              />
              <button
                className="rounded border  bg-white px-4 py-1  hover:shadow-md"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={onImageUpload}
              >
                {loading ? "Uploading..." : "Upload"}
              </button>
            </span>
          </div>
          <div className="flex h-5/6">
            <div className="relative mr-2 h-full w-3/5">
              <CodeEditor code={code} setCode={setCode} />
              <button
                className="absolute -right-12 top-1/3 mr-4 rounded bg-white px-4 py-2 text-gray-900 hover:shadow-md"
                onClick={runCode}
              >
                Run
              </button>
            </div>

            <div className="ml-2 h-2/3 w-2/5">
              {output && <CodeOutput output={output} />}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
