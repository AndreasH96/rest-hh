// APIs

export async function quiz({ output, template }) {
  const computerScienceURL =
    "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=boolean&encode=url3986";
  // const scienceAndNatureURL =
  //   "https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=boolean&encode=url3986";
  const response = await fetch(computerScienceURL);

  const data = await response.json();
  logJSON(data);

  // data.results
  // [
  //   {
  //     "category": "Science: Computers",
  //     "type": "boolean",
  //     "difficulty": "medium",
  //     "question": "The common software-programming acronym &quot;I18N&quot; comes from the term &quot;Interlocalization&quot;.",
  //     "correct_answer": "False",
  //     "incorrect_answers": [
  //       "True"
  //     ]
  //   }...
  // ]
  data.results
    .map((r) => {
      const q = template.content.cloneNode(true);
      const f = q.querySelector("[data-name=question_form]");
      const p = q.querySelector("[data-name=question_p]");
      const o = q.querySelector("[data-name=question_output]");
      const question = decodeURIComponent(r.question);
      const correctAnswer = r.correct_answer;

      f.addEventListener("submit", (e) => {
        e.preventDefault();
        o.value = e.target.question?.value == correctAnswer;
      });

      p.textContent = question;
      return q;
    })
    .forEach((q) => {
      output.appendChild(q);
    });
}

export async function food({ output, foodType = "burger", width = 300 } = {}) {
  // Random food
  const responseRandom = await fetch("https://foodish-api.herokuapp.com/api/");
  const dataRandom = await responseRandom.json();
  logJSON(dataRandom);
  const randomImg = document.createElement("img");
  randomImg.src = dataRandom.image;
  randomImg.width = width;
  output.appendChild(randomImg);

  // Typed random food
  const responseTyped = await fetch(
    `https://foodish-api.herokuapp.com/api/images/${foodType}`
  );
  const dataTyped = await responseTyped.json();
  logJSON(dataTyped);
  const idlyTyped = document.createElement("img");
  idlyTyped.src = dataTyped.image;
  idlyTyped.width = width;
  output.appendChild(idlyTyped);
}

// Helpers
export function logJSON(v) {
  console.log(JSON.stringify(v, null, 2));
}
