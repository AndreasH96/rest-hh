// APIs

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
