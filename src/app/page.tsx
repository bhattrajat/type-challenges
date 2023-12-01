"use client";

import { Progress, Question } from "@/app/types";
import QuestionList from "@/components/questions-list";
import UserProgress from "@/components/user-progress";
import questions from "@/data/questions.json";
import { useEffect, useState } from "react";

export default function Home() {
  const [progress, setProgress] = useState<Progress>(null);

  useEffect(() => {
    const progressStore = localStorage.getItem("progress");
    setProgress(progressStore ? JSON.parse(progressStore) : null);
  }, []);

  return (
    <main className="flex min-h-screen mx-auto flex-col items-center justify-between p-4 lg:p-8">
      <header className="mb-4 p-4 border-b-2 border-white flex w-full items-center justify-between text-center">
        <h1 className="text-3xl mb-2">Type Challenges</h1>

        <a
          className="block"
          target="_blank"
          href="https://github.com/bhattrajat/type-challenges"
        >
          <span className="sr-only">Github</span>
          <svg
            className="fill-black dark:fill-white"
            viewBox="0 0 100 100"
            width={24}
            height={24}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
            />
          </svg>
        </a>
      </header>
      <h2 className="text-lg">What & Why?</h2>
      <p className="max-w-2xl my-4">
        This is a companion app for{" "}
        <a
          className="text-blue-600 dark:text-blue-500 underline"
          href="https://github.com/type-challenges/type-challenges"
        >
          Type challenges
        </a>{" "}
        repository. Since the original repo does not provide a good way to track
        the progress, I made this to keep track of my progress while solving
        typescript challenges. It uses local storage to store the progress.
        Please feel free to use it for your learning. Also PRs are welcome 😊.
      </p>
      <UserProgress progress={progress} questions={questions as Question} />
      <QuestionList
        setProgress={setProgress}
        progress={progress}
        questions={questions as Question}
      />
      <footer className="border-t-2 border-white p-4 center">
        Created with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
