export type Question = {
  [id: string]: {
    difficulty: "easy" | "medium" | "hard" | "extreme";
    name: "string";
    problem: "string";
    tag: "string";
  };
};

export type Progress = {
  [id: string]: 1;
} | null;

export type SearchParams = {
  [key: string]: string | string[] | undefined;
};
