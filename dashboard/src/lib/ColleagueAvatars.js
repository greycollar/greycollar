const ColleagueAvatars = [
  {
    id: "colleague_avatars",
    name: "Colleague Avatars",
    emojis: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
    ].map((icon, index) => ({
      id: icon,
      skins: [
        {
          src: `https://cdn.nucleoid.com/greycollar/avatars/${index + 1}.jpg`,
        },
      ],
    })),
  },
];

export default ColleagueAvatars;
