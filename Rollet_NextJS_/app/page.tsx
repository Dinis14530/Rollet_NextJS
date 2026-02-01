"use client";

import { useState } from "react";
import NameForm from "@/components/Players";
import SpinWheel from "@/components/SpinWheel";
import ChallengeCard from "@/components/Challenges";
import { getRandomChallenge } from "@/data/challenges";
import styles from "./Home.module.css";

const levels = ["level1", "level2", "level3", "level4", "level5", "level6"] as const;

const levelUpMessages: Record<string, string> = {
  level2: "Level 2: Take off one piece of clothing",
  level3: "Level 3: Take off one piece of clothing",
  level4: "Level 4: Take off one piece of clothing",
  level5: "Level 5: Take off one piece of clothing",
  level6: "Level 6: Take off one piece of clothing",
};

export default function Home() {
  const [players, setPlayers] = useState<string[] | null>(null);
  const [winner, setWinner] = useState<string | null>(null);
  const [challenge, setChallenge] = useState<string | null>(null);
  const [rounds, setRounds] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [levelUpMessage, setLevelUpMessage] = useState<string | null>(null);

  const currentLevel = levels[levelIndex];

  if (!players) {
    return (
      <main className={styles.container}>
        <NameForm onStart={setPlayers} />
      </main>
    );
  }

  if (!winner) {
    return (
      <main className={styles.container}>
        {levelUpMessage && <div className={styles.levelMessage}>{levelUpMessage}</div>}
        <SpinWheel
          names={players}
          levelUpMessage={levelUpMessage ?? undefined}
          onResult={(name) => {
            const newRounds = rounds + 1;
            setRounds(newRounds);

            if (newRounds % 4 === 0 && levelIndex < levels.length - 1) {
              const newLevelIndex = levelIndex + 1;
              setLevelIndex(newLevelIndex);

              const message = levelUpMessages[levels[newLevelIndex]];
              setLevelUpMessage(message);

              setTimeout(() => setLevelUpMessage(null), 3000);
            }

            setWinner(name);
            setChallenge(getRandomChallenge(name, players[0], players[1], currentLevel));
          }}
        />
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <ChallengeCard
        player={winner}
        challenge={challenge!}
        onNext={() => {
          setWinner(null);
          setChallenge(null);
        }}
      />
    </main>
  );
}
