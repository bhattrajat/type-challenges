"use client";

import { capitalize } from "@/utils";
import { Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function QuestionsFilter() {
  const searchParams = useSearchParams()!;
  const [difficultyFilter, setDifficultyFilter] = useState({
    easy: searchParams.getAll("difficulty").includes("easy"),
    medium: searchParams.getAll("difficulty").includes("medium"),
    hard: searchParams.getAll("difficulty").includes("hard"),
  });

  useEffect(() => {
    setDifficultyFilter({
      easy: searchParams.getAll("difficulty").includes("easy"),
      medium: searchParams.getAll("difficulty").includes("medium"),
      hard: searchParams.getAll("difficulty").includes("hard"),
    });
  }, [searchParams]);
  console.log(searchParams);
  const pathname = usePathname();
  const router = useRouter();

  const handleDifficultyFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setDifficultyFilter({
      ...difficultyFilter,
      [e.target.value]: e.target.checked,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams(searchParams);
    const searchFilterValue = formData.get("search") as string;
    if (searchFilterValue) params.set("search", searchFilterValue);
    else params.delete("search");
    Object.entries(difficultyFilter).forEach(([key, val]) => {
      if (val && !params.getAll("difficulty").includes(key))
        params.append("difficulty", key);
      else params.delete("difficulty", key);
    });
    router.push(pathname + "?" + params.toString());
  };
  return (
    <search className="my-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:flex-row">
        <input
          className="rounded dark:bg-slate-900 dark:ring-1 dark:ring-slate-500"
          autoComplete="off"
          aria-label="Search Questions"
          placeholder="Search questions"
          type="search"
          id="questions"
          defaultValue={searchParams.get("search") ?? ""}
          name="search"
        />
        <Popover className="relative">
          <Popover.Button className="flex items-center rounded border-[1px] border-black px-4 py-2">
            Difficulty <ChevronDownIcon className="ml-4 h-4 w-4" />
          </Popover.Button>

          <Popover.Panel className="absolute z-10 mt-2 flex flex-col gap-2 rounded border-[1px] border-black bg-white p-4 dark:bg-black">
            {["easy", "medium", "hard"].map((difficulty) => (
              <div className="flex items-center gap-3" key={difficulty}>
                <input
                  onChange={handleDifficultyFilter}
                  type="checkbox"
                  name="difficulty"
                  value={difficulty}
                  defaultChecked={
                    difficultyFilter[difficulty as "easy" | "medium" | "hard"]
                  }
                />
                <label htmlFor={difficulty}>{capitalize(difficulty)}</label>
              </div>
            ))}
          </Popover.Panel>
        </Popover>
        <button
          className="rounded bg-black px-4 py-2 text-white dark:bg-slate-900 dark:ring-1 dark:ring-slate-500"
          type="submit"
        >
          Filter
        </button>
      </form>
    </search>
  );
}
