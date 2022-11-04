
  let name = prompt("type your name");
  if (name === "" || name === null) {
    name = "unknown";
  }
  document.querySelector(".transparent").remove();
  document.querySelector(".hello").textContent = `hello: ${name}`;

let counter = 0;
let wronTryDiv = document.querySelector('.wrong-tries');
let gameBlock = document.querySelector(".game-block");
let blocks = Array.from(document.querySelectorAll(".pic-block"));
// shuffle the picture blocks
// let array = Array.from(Array(blocks.length).keys());
let arrayBlocks = [...Array(blocks.length).keys()];
blocks.forEach(block => {
    block.classList.add('is-flipped');
    setTimeout(()=>{
        block.classList.remove('is-flipped');
    }, 5000)
})

shuffle(arrayBlocks);
// shffle the game blocks using order property
blocks.forEach((block, index) => {
  block.style.order = arrayBlocks[index];
});

function shuffle(array) {
  let index = array.length,
    temp,
    random;

  while (index > 0) {
    random = Math.floor(Math.random() * index);
    index--;
    temp = array[index];
    array[index] = array[random];
    array[random] = temp;
  }
  return array;
}
// console.log(shuffle(arrayBlocks));
// console.log(arrayBlocks);
// console.log(blocks);
// flip the  block
blocks.forEach((block) => {
  block.onclick = function () {
    block.classList.add("is-flipped");
    // get flipped blocks
    let filterdBlocks = blocks.filter((ele) => {
      return ele.classList.contains("is-flipped");
    });
    if (filterdBlocks.length === 2) {
      matched(filterdBlocks[0], filterdBlocks[1]);
      gameBlock.classList.add("stop-click");
      setTimeout(() => {
        gameBlock.classList.remove("stop-click");
        filterdBlocks.forEach((ele) => {
          ele.classList.remove("is-flipped");
        });
      }, 1000);
    }
    endGame(counter);
    win(blocks);
  };
});
function matched(firstBlock, secondBlock) {
  if (firstBlock.dataset.name === secondBlock.dataset.name) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("is-matched");
    secondBlock.classList.add("is-matched");
  }
  else {
    counter++;
    wronTryDiv.textContent = `wrong-tries: ${counter}`
  }
}
function endGame(num) {
    if (num === 10) {
        let endDiv = document.createElement("div");
        endDiv.className = 'end';
        endDiv.textContent = 'Sorry you lost all your attempts';
        document.body.appendChild(endDiv);
        gameBlock.classList.add("stop-click");
    }
}

function win(array) {
    let newArr = array.filter(ele=>{
        return ele.classList.contains('is-matched');
    })
    console.log(newArr);
    if (newArr.length === array.length) {
        let winDiv = document.createElement("div");
        winDiv.className = 'win';
        winDiv.textContent = 'thats great your memory is perfect';
        document.body.appendChild(winDiv);
        gameBlock.classList.add("stop-click");
    }
}