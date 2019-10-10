const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const bookList = require("./bookList.js");

let makeRequest = (book, chapter) => {
  request(
    `https://www.wuxiaworld.com/novel/stellar-transformations/st-book-${book}-chapter-${chapter}/`,
    (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const content = $("p");

        fs.writeFile(
          `./novel/book-${book}/chapter-${chapter}.txt`,
          content.text(),
          () => {
            console.log(`Book ${book} chapter ${chapter} downloaded!`);
          }
        );
      } else {
        makeRequest(book, chapter);
      }
    }
  );
};

bookList.forEach(item => {
  for (let i = 1; i <= item.chapters; i++) {
    makeRequest(item.book, i);
  }
});
