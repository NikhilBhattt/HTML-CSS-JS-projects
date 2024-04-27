let options = document.querySelectorAll(".userChoice");
let userScoreboard = document.querySelector('.userScore');
let compScoreboard = document.querySelector('.compScore');
let msg = document.querySelector('.result');

const compChoice = () => {
  return Math.floor(Math.random() * 3);
};

const winner = (user) => {
  let choices = {'0':'Rock', '1':'Paper', '2':'Scissors'};
  let comp = compChoice();
  if (user==comp) {
    msg.innerText = "It's a Draw";
    msg.style.backgroundColor = 'midnightblue';
  }
  else if ((user==0 && comp==1) || 
      (user==1 && comp==2) || 
      (user==2 && comp==0)){
    msg.style.backgroundColor = 'red'
    msg.innerText = `you Lose, ${choices[comp]} beats ${choices[user]}`;
    compScoreboard.innerText = +compScoreboard.innerText + 1;
  }
  else{
    msg.style.backgroundColor = 'green'
    msg.innerText = `you Won, ${choices[user]} beats ${choices[comp]}`;
    userScoreboard.innerText = +userScoreboard.innerText + 1;
  }
};

options.forEach((choice) => {
  choice.addEventListener('click', () => {
    winner(choice.getAttribute('id'));
  });
});
