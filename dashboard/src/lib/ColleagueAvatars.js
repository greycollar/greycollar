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
    ].map((icon, index) => ({
      id: icon,
      skins: [
        {
          src: `https://api-dev-minimal-v510.vercel.app/assets/images/avatar/avatar_${
            index + 1
          }.jpg`,
        },
      ],
    })),
  },
];

export default ColleagueAvatars;
