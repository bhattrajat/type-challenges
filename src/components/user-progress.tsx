import { Progress, Question } from "@/app/types";

type Props = {
  progress: Progress;
  questions: Question;
};
export default function UserProgress(props: Props) {
  const totalCount = {
    easy: 0,
    medium: 0,
    hard: 0,
    extreme: 0,
  };
  const completedCount = {
    easy: 0,
    medium: 0,
    hard: 0,
    extreme: 0,
  };
  Object.values(props.questions).forEach((question) => {
    totalCount[question.difficulty] += 1;
  });
  if (props.progress) {
    Object.keys(props.progress).forEach((id) => {
      completedCount[props.questions[id].difficulty] += 1;
    });
  }
  const difficulties = ["easy", "medium", "hard", "extreme"] as const;
  return (
    <div className="mb-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
      {difficulties.map((difficulty) => (
        <div key={difficulty}>
          <div>{`${difficulty[0].toUpperCase()}${difficulty.slice(1)}`}</div>
          <progress
            className="[&::-webkit-progress-value]:transition-[width] [&::--moz-progress-bar]:transition-[width] [&::-webkit-progress-value]:bg-blue-700 [&::-moz-progress-bar]:bg-blue-700 [&::-webkit-progress-value]:duration-[.5s]"
            id="easy"
            max={totalCount.easy}
            value={completedCount[difficulty]}
          >
            {completedCount[difficulty]}%
          </progress>
          <div>
            {`${completedCount[difficulty]}/${totalCount[difficulty]}`}{" "}
            Completed
          </div>
        </div>
      ))}
    </div>
  );
}
