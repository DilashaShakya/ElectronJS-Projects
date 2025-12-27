async function loadQuote() {
  try {
    const res = await fetch(`https://zenquotes.io/api/random?cb=${Date.now()}`, {
      cache: "no-store",
    });

    const data = await res.json(); // array
    const quote = data[0].q;
    const author = data[0].a;

    // Display the quote and author
    document.getElementById("quote").innerHTML = `<p>${quote}</p><p>- ${author}</p>`;

  } catch (err) {
    console.error("Error loading quote:", err);
    document.getElementById("quote").textContent = `Could not load quote. Error: ${err.message}`;
  }
}

loadQuote();
setInterval(loadQuote, 7000);
