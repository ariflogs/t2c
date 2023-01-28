import React from "react";

export default function Footer() {
  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center border-t border-gray-400 py-2 align-middle text-sm text-gray-200">
      <a
        href="https://github.com/ariflogs/t2c"
        target="_blank"
        rel="noreferrer"
      >
        Github
      </a>
      <span className="px-2">-</span>
      <a href="https://twitter.com/ariflogs" target="_blank" rel="noreferrer">
        Twitter
      </a>
    </div>
  );
}
