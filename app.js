/*****************/
/* EDITABLE INFO */
/*****************/

/* -------------------------------------------------------- */

const NAME = "Anson";

const CARDS = [
  {
    name: "Search",
    icon: "ri-search-2-fill",
    link: "https://www.duckduckgo.com/",
  },
  {
    name: "Mail",
    icon: "ri-mail-fill",
    link: "https://mail.proton.me/",
    color: "#5C519C"
  },
  {
    name: "Github",
    icon: "ri-github-fill",
    link: "https://github.com/",
  },
  {
    name: "Discord",
    icon: "ri-discord-fill",
    link: "https://discord.com/app/",
    color: "#5865F2",
  },
  {
    name: "LinkedIn",
    icon: "ri-linkedin-fill",
    link: "https://www.linkedin.com/",
  },
  {
    name: "Reddit",
    icon: "ri-reddit-fill",
    link: "https://www.reddit.com/",
    color: "#FF4500",
  },
  {
    name: "YouTube",
    icon: "ri-youtube-fill",
    link: "https://www.youtube.com/",
    color: "#FF0000",
  },
  {
    name: "Bilibili",
    icon: "ri-bilibili-fill",
    link: "https://www.bilibili.com/",
    color: "#2596BE",
  },
  {
    name: "iooi home",
    icon: "ri-home-smile-fill",
    link: "https://www.iooi.ca/",
  },
];

/* -------------------------------------------------------- */

/******************/
/* CLOCK FUNCTION */
/******************/

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const updateDate = () => {
  // Create a new Date object and get the complete Date/Time information
  const completeDate = new Date();

  // Time Variables
  let currentHour = formatDigit(completeDate.getHours());
  let currentMinute = formatDigit(completeDate.getMinutes());

  // Date Variables
  let currentDay = completeDate.getDay();
  let currentNumber = completeDate.getDate();
  let currentMonth = completeDate.getMonth();
  let currentYear = completeDate.getFullYear();

  // Update the Time
  currentTime.innerHTML = `${
    currentHour % 12 == 0 ? "12" : currentHour % 12
  }:${currentMinute} ${currentHour > 11 ? "PM" : "AM"}`;

  // Update the Date
  currentDate.innerHTML = `${DAYS[currentDay]} ${currentNumber}, ${MONTHS[currentMonth]} ${currentYear}`;

  // Create a Loop
  setTimeout(() => {
    updateDate();
  }, 1000);
};

const addCustomColorListener = (htmlNode, card) => {
  // If a `customColor` isn't provided, don't do anything
  if (!card?.color) return;

  // Add custom color whenever the cursor enters the card
  htmlNode.addEventListener("mouseenter", (event) => {
    htmlNode.style.color = card.color;
    htmlNode.style.borderColor = card.color;

    event.target.setAttribute("isHovered", true);
  });

  // Remove custom color whenever the cursor leaves the card
  htmlNode.addEventListener("mouseleave", (event) => {
    event.target.setAttribute("isHovered", false);
    if (event.target.getAttribute("isFocused") == "true") return;

    htmlNode.style.color = "white";
    htmlNode.style.borderColor = "rgba(255, 255, 255, 0.05)";
  });

  // Add custom color whenever the card is focused
  htmlNode.addEventListener("focus", (event) => {
    htmlNode.style.color = card.color;
    htmlNode.style.borderColor = card.color;

    event.target.setAttribute("isFocused", true);
  });

  // Remove custom color whenever the card is blurred
  htmlNode.addEventListener("blur", (event) => {
    event.target.setAttribute("isFocused", false);
    if (event.target.getAttribute("isHovered") == "true") return;

    htmlNode.style.color = "white";
    htmlNode.style.borderColor = "rgba(255, 255, 255, 0.05)";
  });
};

const formatDigit = (digit) => {
  return digit > 9 ? `${digit}` : `0${digit}`;
};

/******************/
/* CARDS FUNCTION */
/******************/

const printCards = () => {
  for (const card of CARDS) {
    let currentCard = document.createElement("a");
    let currentCardText = document.createElement("p");
    currentCardText.appendChild(document.createTextNode(card.name));
    let currentCardIcon = document.createElement("i");
    currentCardIcon.classList.add(card.icon);

    // Style the Card Element
    currentCard.classList.add("card");
    currentCard.href = card.link;

    // Style the Icon
    currentCardIcon.classList.add("card__icon");

    // Style the Text
    currentCardText.classList.add("card__name");

    currentCard.append(currentCardIcon);
    currentCard.append(currentCardText);

    // Initialize flag attributes
    currentCard.setAttribute("isHovered", false);
    currentCard.setAttribute("isFocused", false);

    cardContainer.appendChild(currentCard);

    addCustomColorListener(currentCard, card);

    // Handle the click event
    currentCard.addEventListener("click", async (event) => {
      // If the card doesn't have `clipboard: true` don't do anything
      if (!card.clipboard) return;

      // Prevent the page from opening
      event.preventDefault();
      // Copy the href to the clipboard
      try {
        await navigator.clipboard.writeText(card.link);
        currentCard.blur();
        currentCardText.innerText = "Saved to clipboard!";
        setTimeout(() => {
          currentCardText.innerText = card.name;
        }, 1500);
      } catch {
        currentCardText.innerText = "Unable to copy";
        setTimeout(() => {
          currentCardText.innerText = card.name;
        }, 1500);
      }
    });
  }
};

/****************/
/* STARTER CODE */
/****************/

userName.innerHTML = NAME;
printCards();
updateDate();
