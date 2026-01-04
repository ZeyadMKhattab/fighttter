function retangularcollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackbox.position.x + rectangle1.attackbox.width >=
      rectangle2.position.x &&
    rectangle1.attackbox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackbox.position.y + rectangle1.attackbox.height >=
      rectangle2.position.y &&
    rectangle1.attackbox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function determineWinner({ player, enemy, timeid }) {
  clearTimeout(timeid);
  const pop = document.querySelector("#endGame");
  const resultDiv = document.querySelector("#result");
  
  if(pop) {
    setTimeout(() => {
      pop.style.display = "flex";
    }, 1000);
  }

  const pName = localStorage.getItem("p1_name") ? localStorage.getItem("p1_name").toUpperCase() : "PLAYER 1";
  const eName = localStorage.getItem("p2_name") ? localStorage.getItem("p2_name").toUpperCase() : "PLAYER 2";
  const isAR = localStorage.getItem("arabic");

  let message = "";

  if (player.health === enemy.health) {
    message = isAR ? "تعادل" : "TIE";
  } else if (player.health > enemy.health) {
    message = isAR ? pName + " فاز" : pName + " WIN";
  } else if (player.health < enemy.health) {
    message = isAR ? eName + " فاز" : eName + " WIN";
  }

  if (resultDiv) {
    resultDiv.innerText = message;
    resultDiv.style.display = "flex";
  }
}
