const questions = {};
const rows = document.querySelectorAll("tr");
rows.forEach((row) => {
  const [tagCol, challengesCol] = row.querySelectorAll("td");
  const challenges = challengesCol.querySelectorAll("a");
  challenges.forEach((challenge) => {
    const challengePath = challenge.href.split("/");
    const challengeName = challengePath[challengePath.length - 2];
    const [id, difficulty, ...name] = challengeName.split("-");
    const nameStr = name.join(" ");
    const idNum = parseInt(id);
    questions[idNum] = {
      tag: tagCol.querySelector("img").alt.slice(1),
      difficulty,
      name: nameStr[0].toUpperCase() + nameStr.slice(1),
      problem: `https://tsch.js.org/${idNum}/play`,
    };
  });
});

function saveAsFile(filename, data) {
  const blob = new Blob([JSON.stringify(data)]);
  const link = document.createElement("a");
  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  console.log("here");
  link.click();
}

saveAsFile("questions.json", questions);
