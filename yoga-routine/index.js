const main = document.querySelector("main");
const basicArray = [
  { pic: 0, min: 1 },
  { pic: 1, min: 1 },
  { pic: 2, min: 1 },
  { pic: 3, min: 1 },
  { pic: 4, min: 1 },
  { pic: 5, min: 1 },
  { pic: 6, min: 1 },
  { pic: 7, min: 1 },
  { pic: 8, min: 1 },
  { pic: 9, min: 1 },
];
let exerciceArray = [];

// Get stored exercices array, fonction anonyme qui se lance une fois
(() => {
  if (localStorage.exercices) {
    exerciceArray = JSON.parse(localStorage.exercices);
  } else {
    exerciceArray = basicArray;
  }
})();

class Exercice {
  constructor() {
    this.index = 0;
    this.minutes = exerciceArray[this.index].min;
    this.secondes = 0;
  }

  updateCountdown() {
    this.secondes = this.secondes < 10 ? "0" + this.secondes : this.secondes;

    setTimeout(() => {
      if (this.minutes === 0 && this.secondes === "00") {
        this.index++;
        // this.ring();
        if (this.index < exerciceArray.length) {
          this.minutes = exerciceArray[this.index].min;
          this.secondes = 0;
          this.updateCountdown();
        } else {
          return page.finish();
        }
      } else if (this.secondes === "00") {
        this.minutes--;
        this.secondes = 59;
        this.updateCountdown();
      } else {
        this.secondes--;
        this.updateCountdown();
      }
    }, 10);

    return (main.innerHTML = `
    <div class="exercice-container">
      <p>${this.minutes}:${this.secondes}</p>
      <img src="./img/${exerciceArray[this.index].pic}.png" />
      <div>${this.index + 1}/${exerciceArray.length}</div>
    </div>`);
  }
}

const utils = {
  pageContent: function (title, content, btn) {
    document.querySelector("h1").innerHTML = title;
    main.innerHTML = content;
    document.querySelector(".btn-container").innerHTML = btn;
  },

  handleEventMinutes: function () {
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener("input", (e) => {
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.id) {
            exo.min = parseInt(e.target.value);
            this.storage();
          }
        });
      });
    });
  },

  handleEventArrow: function () {
    document.querySelectorAll(".arrow").forEach((arrow) => {
      arrow.addEventListener("click", (e) => {
        let position = 0;
        exerciceArray.map((exo) => {
          if (exo.pic == e.target.dataset.pic && position !== 0) {
            [exerciceArray[position], exerciceArray[position - 1]] = [
              exerciceArray[position - 1],
              exerciceArray[position],
            ];
            page.lobby();
            this.storage();
          } else {
            position++;
          }
        });
      });
    });
  },

  deleteItem: function () {
    document.querySelectorAll(".deleteBtn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        let newArr = [];
        exerciceArray.map((exo) => {
          if (exo.pic != e.target.dataset.pic) {
            newArr.push(exo);
          }
        });
        exerciceArray = newArr;
        page.lobby();
        this.storage();
      });
    });
  },

  reboot: function () {
    exerciceArray = basicArray;
    page.lobby();
    this.storage();
  },

  //   rebootLobby: function () {
  //     const reboot = document.getElementById("reboot");
  //     reboot.addEventListener("click", (e) => {
  //       exerciceArray = [
  //         { pic: 0, min: 1 },
  //         { pic: 1, min: 1 },
  //         { pic: 2, min: 1 },
  //         { pic: 3, min: 1 },
  //         { pic: 4, min: 1 },
  //         { pic: 5, min: 1 },
  //         { pic: 6, min: 1 },
  //         { pic: 7, min: 1 },
  //         { pic: 8, min: 1 },
  //         { pic: 9, min: 1 },
  //       ];
  //       page.lobby();
  //     });
  //   },

  storage: function () {
    localStorage.exercices = JSON.stringify(exerciceArray);
  },
};

const page = {
  lobby: function () {
    let mapArray = exerciceArray
      .map(
        (exo) =>
          `
        <li>
          <div class="card-header">
            <input type="number" id=${exo.pic} min="1" max="10" value=${exo.min}>
            <span>min</span>
          </div>
          <img src="./img/${exo.pic}.png" />
          <i class="fas fa-arrow-alt-circle-left arrow" data-pic=${exo.pic}></i>
          <i class="fas fa-times-circle deleteBtn" data-pic=${exo.pic}></i>
        </li>
      `
      )
      .join("");

    utils.pageContent(
      "Paramétrage <i id='reboot' class='fas fa-undo'></i>",
      "<ul>" + mapArray + "</ul>",
      "<button id='start'>Commencer<i class='far fa-play-circle'></i></button>"
    );
    utils.handleEventMinutes();
    utils.handleEventArrow();
    utils.deleteItem();
    reboot.addEventListener("click", () => utils.reboot());
    // utils.rebootLobby();
    start.addEventListener("click", () => this.routine());
  },

  routine: function () {
    const exercice = new Exercice();

    utils.pageContent("Routine", exercice.updateCountdown(), null);
  },

  finish: function () {
    utils.pageContent(
      "C'est terminé <i id='reboot' class='fas fa-undo'></i>",
      "<button id='start'>Recommencer</button>",
      "<button id='reboot' class='btn-reboot'>Réinintialiser<i class='far fa-times-circle'></i></button>"
    );
  },
};

page.lobby();
