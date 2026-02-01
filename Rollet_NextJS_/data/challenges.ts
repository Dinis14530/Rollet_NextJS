interface Challenge {
  text: string;
  author: "player1" | "player2" | "any";
}

export const challenges: Record<string, Challenge[]> = {
  level1: [
    { text: "Give a kiss to {target}", author: "any" },
    { text: "Give a kiss to {target}", author: "player1" },
    { text: "Give a kiss to {target}", author: "player2" },
  ],
  level2: [
    { text: "", author: "any" },
    { text: "", author: "any" },
  ],
  level3: [
    { text: "", author: "any" },
    { text: "", author: "any" },
  ],
  level4: [
    { text: "", author: "any" },
    { text: "", author: "any" },
  ],
  level5: [
    { text: "", author: "any" },
    { text: "", author: "any" },
  ],
  level6: [
    { text: "", author: "any" },
    { text: "", author: "any" },
  ],
};


// Função que retorna um desafio aleatório do nível escolhido
export function getRandomChallenge(
 winner: string,
  player1: string,
  player2: string,
  level: keyof typeof challenges
): string {
  const levelChallenges = challenges[level];

  const allowedChallenges = levelChallenges.filter((c) => {
    if (c.author === "any") return true;
    if (c.author === "player1" && winner === player1) return true;
    if (c.author === "player2" && winner === player2) return true;
    return false;
  });


  const randomChallenge =
    allowedChallenges[Math.floor(Math.random() * allowedChallenges.length)];

  const target = winner === player1 ? player2 : player1;

  return randomChallenge.text
    .replace("{player}", winner)
    .replace("{target}", target);
}






