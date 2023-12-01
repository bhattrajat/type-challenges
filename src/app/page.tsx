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
    <main className="flex min-h-screen lg:max-w-5xl mx-auto flex-col items-center justify-between p-20">
      <header className="mb-4 text-center">
        <h1 className="text-3xl mb-2">Type Challenges</h1>
        <p>
          Motivation: This is a companion app for{" "}
          <a
            className="text-blue-500 underline"
            href="https://github.com/type-challenges/type-challenges"
          >
            Type challenges
          </a>{" "}
          repository. Since the original repo does not provide a good way to
          track the progress, I made this to keep track of my progress while
          solving typescript challenges
        </p>
      </header>
      <UserProgress progress={progress} questions={questions as Question} />
      <QuestionList
        setProgress={setProgress}
        progress={progress}
        questions={questions as Question}
      />
    </main>
  );
}
