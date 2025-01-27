const TeamIcons = [
  {
    id: "team_icons",
    name: "Department Icons",
    emojis: ["tdesign/anchor", "tdesign/analytics"].map((icon) => ({
      id: icon,
      skins: [
        {
          src: `https://api.iconify.design/${icon}.svg?color=%232065d1&width=75&height=75'`,
        },
      ],
    })),
  },
];

export default TeamIcons;
