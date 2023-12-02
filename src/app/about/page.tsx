export default function Page() {
  return (
    <main className="flex min-h-screen mx-auto flex-col items-center p-4 lg:p-8">
      <h2 className="text-lg">What & Why?</h2>
      <p className="max-w-2xl my-4">
        This is a companion app for{" "}
        <a
          className="text-blue-700 dark:text-blue-500 underline"
          href="https://github.com/type-challenges/type-challenges"
        >
          Type challenges
        </a>{" "}
        repository. Since the original repo does not provide a good way to track
        the progress, I made this to keep track of my progress while solving
        typescript challenges. It uses local storage to store the progress.
        Please feel free to use it for your learning. Also PRs are welcome 😊.
      </p>
    </main>
  );
}
