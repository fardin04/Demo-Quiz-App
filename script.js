const MyBtn = document.querySelector(".MyBtn button");
const RulesBox = document.querySelector(".RulesBox");
const ExitBtn = document.querySelector(".MyBtns .ExitBtn");
const ConBtn = document.querySelector(".MyBtns .ConBtn");
const NextQ = document.querySelector(".NextQ");
const Questions = document.querySelector(".Question");
const OptionList = document.querySelector(".MyOptions");
const TimeCount = document.querySelector(".TimeCount .Sec");
const TimeLine = document.querySelector(".TimeLine");
const ResultBox = document.querySelector(".ResultBox");
const ReplayBtn = document.querySelector(".ReplayBtn");
const QuitBtn = document.querySelector(".QuitBtn");
const ScoreText = document.querySelector(".Score");

MyBtn.onclick = () => {
  RulesBox.classList.add("ActiveInfo");
};

ExitBtn.onclick = () => {
  RulesBox.classList.remove("ActiveInfo");
};

ConBtn.onclick = () => {
  RulesBox.classList.remove("ActiveInfo");
  Questions.classList.add("ActiveQuiz");
  ShowQuestion(0);
  StartTimer(20);
  StartTimerLine(0);
};

ReplayBtn.onclick = () => {
  ResetQuiz();
};

QuitBtn.onclick = () => {
  ResetQuiz();
};

let Qcount = 0;
let Counter;
let TimeValue = 20;
let TimeCounterLine;
let WidthValue = 0;
let UserScore = 0;

NextQ.onclick = () => {
  if (Qcount < questions.length - 1) {
    Qcount++;
    ShowQuestion(Qcount);
    clearInterval(Counter);
    StartTimer(TimeValue);
    clearInterval(TimeCounterLine);
    StartTimerLine(0);
    NextQ.style.display = "none";
  } else {
    ShowResultBox();
  }
};

function ShowQuestion(index) {
  const QuestionText = document.querySelector(".Q");
  let QuestionsTag =
    "<span>" +
    questions[index].num +
    ". " +
    questions[index].question +
    "</span>";
  let OptionsTag =
    '<div class="Options" onclick="OptionSelected(this)"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="Options" onclick="OptionSelected(this)"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="Options" onclick="OptionSelected(this)"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="Options" onclick="OptionSelected(this)"><span>' +
    questions[index].options[3] +
    "</span></div>";
  QuestionText.innerHTML = QuestionsTag;
  OptionList.innerHTML = OptionsTag;

  const TotalQuestions = document.querySelector(".TotalQ");
  let TotalQuestionsTag =
    "<p>" + (index + 1) + " of " + questions.length + " Question</p>";
  TotalQuestions.innerHTML = TotalQuestionsTag;
}

let TickIcon =
  '<div class="TickIcon"><i class="fa-solid fa-square-check"></i></div>';
let CrossIcon =
  '<div class="CrossIcon"><i class="fa-solid fa-square-xmark"></i></div>';

function OptionSelected(ans) {
  clearInterval(Counter);
  clearInterval(TimeCounterLine);
  let UserAns = ans.textContent.trim();
  let CorrectAns = questions[Qcount].ans;
  let AllOptions = OptionList.children.length;

  if (UserAns === CorrectAns) {
    UserScore += 1;
    ans.classList.add("correct");
    ans.insertAdjacentHTML("beforeend", TickIcon);
  } else {
    ans.classList.add("incorrect");
    ans.insertAdjacentHTML("beforeend", CrossIcon);
    for (let i = 0; i < AllOptions; i++) {
      if (OptionList.children[i].textContent.trim() == CorrectAns) {
        OptionList.children[i].classList.add("correct");
        OptionList.children[i].insertAdjacentHTML("beforeend", TickIcon);
      }
    }
  }
  for (let i = 0; i < AllOptions; i++) {
    OptionList.children[i].classList.add("disabled");
    NextQ.style.display = "block";
  }
}

function StartTimer(Time) {
  Counter = setInterval(timer, 1000);
  function timer() {
    TimeCount.textContent = Time;
    Time--;
    if (Time < 9) {
      let AddZero = TimeCount.textContent;
      TimeCount.textContent = "0" + AddZero;
    }
    if (Time < 0) {
      clearInterval(Counter);
      TimeCount.textContent = "00";
    }
  }
}

function ShowResultBox() {
  Questions.classList.remove("ActiveQuiz");
  ResultBox.classList.add("ActiveResult");
  let ScoreTag = "";
  if (UserScore >= 3) {
    ScoreTag =
      "<span>Congratulations! You Got <p>" +
      UserScore +
      "</p> Out Of <p>" +
      questions.length +
      "</p></span>";
  } else if (UserScore >= 1) {
    ScoreTag =
      "<span>Good Job! You Got <p>" +
      UserScore +
      "</p> Out Of <p>" +
      questions.length +
      "</p></span>";
  } else {
    ScoreTag =
      "<span>Sorry! You Got <p>" +
      UserScore +
      "</p> Out Of <p>" +
      questions.length +
      "</p>. Better Luck Next Time!</span>";
  }
  ScoreText.innerHTML = ScoreTag;
}

function StartTimerLine(Time) {
  TimeCounterLine = setInterval(Timer, 50);
  function Timer() {
    Time += 1;
    TimeLine.style.width = Time + "px";
    if (Time >= 319) {
      clearInterval(TimeCounterLine);
    }
  }
}

function ResetQuiz() {
  Qcount = 0;
  UserScore = 0;
  ShowQuestion(Qcount);
  StartTimer(20);
  StartTimerLine(0);
  Questions.classList.add("ActiveQuiz");
  ResultBox.classList.remove("ActiveResult");
  NextQ.style.display = "none";
}
