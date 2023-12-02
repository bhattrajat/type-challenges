"use client";

import { Progress, Question } from "@/app/types";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  progress: Progress;
  questions: Question;
  setProgress: Dispatch<SetStateAction<Progress>>;
};
export default function QuestionList(props: Props) {
  const searchParams = useSearchParams();
  const handleChallenge = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      const updatedProgress = { ...props.progress, [id]: 1 } as const;
      props.setProgress(updatedProgress);
      localStorage.setItem("progress", JSON.stringify(updatedProgress));
    } else {
      const { [id]: _, ...remaining } = props.progress!;
      props.setProgress(remaining);
      localStorage.setItem("progress", JSON.stringify(remaining));
    }
  };
  const search = searchParams.get("search");
  const difficulties = searchParams.getAll("difficulty");
  console.log(search);
  console.log(difficulties);
  const filteredQuestionsByName =
    search && typeof search === "string"
      ? Object.entries(props.questions).filter(([_, val]) =>
          val.name.toLowerCase().includes(search.toLowerCase()),
        )
      : Object.entries(props.questions);
  const filteredQuestionsByDifficulty =
    difficulties.length > 0
      ? filteredQuestionsByName.filter(([_, val]) =>
          difficulties.includes(val.difficulty),
        )
      : filteredQuestionsByName;
  if (filteredQuestionsByDifficulty.length === 0) {
    return (
      <p>
        No Questions found with the current filter. Please update the filter
      </p>
    );
  }
  return (
    <table className="mb-4 border-collapse border-white">
      <thead>
        <tr>
          <th>Status</th>
          <th>Challenge</th>
          <th>Difficulty</th>
        </tr>
      </thead>
      <tbody>
        {filteredQuestionsByDifficulty.map(([id, question]) => (
          <tr key={id}>
            <td key={id}>
              <input
                type="checkbox"
                className="h-4 w-4 accent-blue-700 dark:accent-blue-500"
                onChange={(e) => handleChallenge(e, id)}
                name={id}
                checked={Boolean(props.progress && props.progress[id])}
                value={id}
              />
            </td>
            <td>
              <a
                className="text-blue-700 underline dark:text-blue-500"
                target="_blank"
                href={question.problem}
              >
                {question.name}
              </a>
            </td>
            <td>{question.difficulty}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
