let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset-btn");
let win_msg_container = document.querySelector(".msg-container");
let new_game_btn = document.querySelector(".win-btn");
let result_msg = document.querySelector(".result");
let scoreboard = document.querySelector(".scoreboard");
let score_of_X = 0;
let score_of_O = 0;
let color = '#b0413e';
let playerX = true;

let winning_possiblities = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

const check_winner = () => {
  let Xarr = [];
  let Oarr = [];
  for (let i=0; i<boxes.length; i++){
    if (boxes[i].innerText === 'X') Xarr.push(i);
    else if (boxes[i].innerText === 'O') Oarr.push(i);
  }
  for (let win_slots of winning_possiblities){
    let X=0, O=0;
    for (let idx of win_slots){
      if (Xarr.includes(idx)) X++;
      if (Oarr.includes(idx)) O++;
    }
    if (X>2){ score_of_X++; return 'X'; }
    if (O>2){ score_of_O++; return 'O'; }
  }
  return (Xarr.length+Oarr.length===9)? 1 : 0;
};

const disable_boxes = () => {
  for (let box of boxes)
    box.disabled = true;
};

const clear_enable_boxes = () => {
  for (let box of boxes){
    box.innerText = '';
    box.disabled = false;
  }
};

const show_result = (winner) => {
  if (winner===1){
    result_msg.innerText = "It's a Draw!";
    return;
  }
  else if (winner===0) return;
  else {
    result_msg.innerText = `Congratulations, Winner is '${winner}' !`;
    disable_boxes();
    scoreboard.innerHTML = `<h2>ScoreBoard</h2>X - ${score_of_X} | O - ${score_of_O}`;
    win_msg_container.style.display = 'block';
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {    
    if (playerX){
      if (color==='blue') color = '#b0413e';
      box.style.color = color;
      box.innerText = 'X';
      color = 'blue';
    }else{
      if (color==='#b0413e') color = 'blue';
      box.style.color = color;
      box.innerText = 'O';
      color = '#b0413e';
    } 
    box.disabled = true;
    let winner = check_winner(boxes, winning_possiblities);
    show_result(winner);
    playerX = !playerX;
  });
});

resetBtn.addEventListener("click", () => {
  clear_enable_boxes();
});

new_game_btn.addEventListener('click', () => {
  win_msg_container.style.display = 'none';
  clear_enable_boxes();
});
