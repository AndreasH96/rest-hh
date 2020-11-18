// APIs
export async function covid({
  output,
  covidTableTemplate,
  covidRowTemplate,
} = {}) {
  const response = await fetch(
    "https://api.covid19api.com/total/country/sweden"
  );
  const data = await response.json();
  console.table(
    data.slice(0, 10).map((d) => ({
      Date: d.Date,
      Confirmed: d.Confirmed,
      Recovered: d.Recovered,
      Active: d.Active,
      Deaths: d.Deaths,
    }))
  );

  const covidOutput = covidTableTemplate.content.cloneNode(true);
  const covidTableBody = covidOutput.querySelector("tbody");
  data.forEach((d) => {
    const t = covidRowTemplate.content.cloneNode(true);
    t.querySelector("[data-name=Date]").textContent = d.Date;
    t.querySelector("[data-name=Confirmed]").textContent = d.Confirmed;
    t.querySelector("[data-name=Recovered]").textContent = d.Recovered;
    t.querySelector("[data-name=Active]").textContent = d.Active;
    t.querySelector("[data-name=Deaths]").textContent = d.Deaths;
    covidTableBody.appendChild(t);
  });
  output.appendChild(covidOutput);
}

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
  const response = await fetch("https://foodish-api.herokuapp.com/api/");
  const data = await response.json();
  logJSON(data);
  const randomImg = document.createElement("img");
  randomImg.src = data.image;
  randomImg.width = width;
  output.appendChild(randomImg);

  // Typed random food
  response = await fetch(
    `https://foodish-api.herokuapp.com/api/images/${foodType}`
  );
  data = await response.json();
  logJSON(data);
  const idlyImg = document.createElement("img");
  idlyImg.src = data.image;
  idlyImg.width = width;
  output.appendChild(idlyImg);
}

export async function giphy({
  output,
  limit = "1",
  offset = "1",
  q = "magic",
  YOUR_API_KEY = "dc6zaTOxFJmzC", // Public beta key. https://giphy.api-docs.io/1.0/welcome/access-and-api-keys
} = {}) {
  // Search giphy for gif
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/search?rating=pg&api_key=${YOUR_API_KEY}&limit=${limit}&offset=${offset}&q=${q}`
  );
  const data = await response.json();
  console.log(data);
  logJSON(data);
  const gif = document.createElement("img");
  gif.src = data.data[0].images.original.url;
  output.appendChild(gif);
}

// Helpers
function logJSON(v) {
  console.log(JSON.stringify(v, null, 2));
}
