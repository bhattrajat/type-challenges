"use client";

import { Progress, Question } from "@/app/types";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type Props = {
  progress: Progress;
  questions: Question;
  setProgress: Dispatch<SetStateAction<Progress>>;
};
export default function QuestionList(props: Props) {
  const handleChallenge = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      const updatedProgress = { ...props.progress, [id]: 1 } as const;
      props.setProgress(updatedProgress);
      localStorage.setItem("progress", JSON.stringify(updatedProgress));
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [id]: _, ...remaining } = props.progress!;
      props.setProgress(remaining);
      localStorage.setItem("progress", JSON.stringify(remaining));
    }
  };
  return (
    <table className="border-white border-collapse">
      <thead>
        <tr>
          <th>Status</th>
          <th>Challenge</th>
          <th>Difficulty</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(props.questions).map(([id, question]) => (
          <tr key={id}>
            <td key={id}>
              <input
                type="checkbox"
                className="w-4 h-4 accent-blue-600"
                onChange={(e) => handleChallenge(e, id)}
                name={id}
                checked={Boolean(props.progress && props.progress[id])}
                value={id}
              />
            </td>
            <td>
              <a
                className="text-blue-500 underline"
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
