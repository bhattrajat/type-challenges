"use client";

import { Progress, Question, SearchParams } from "@/app/types";
import QuestionsFilter from "@/components/questions-filter";
import QuestionList from "@/components/questions-list";
import UserProgress from "@/components/user-progress";
import questions from "@/data/questions.json";
import { useEffect, useState } from "react";

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const [progress, setProgress] = useState<Progress>(null);

  useEffect(() => {
    const progressStore = localStorage.getItem("progress");
    setProgress(progressStore ? JSON.parse(progressStore) : null);
  }, []);

  return (
    <main className="mx-auto flex min-h-screen flex-col items-center p-4 lg:p-8">
      <UserProgress progress={progress} questions={questions as Question} />
      <QuestionsFilter />
      <QuestionList
        searchParams={searchParams}
        setProgress={setProgress}
        progress={progress}
        questions={questions as Question}
      />
      <footer className="center mt-auto border-t-2 border-black p-4 dark:border-white">
        Created with Next.js & Tailwind CSS
      </footer>
    </main>
  );
}
