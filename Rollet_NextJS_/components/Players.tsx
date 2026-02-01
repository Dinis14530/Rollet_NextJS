"use client";

import { useState } from "react";
import styles from "./Players.module.css";

export default function Players({ onStart }: { onStart: (names: string[]) => void }) {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Enter Player Names</h1>

      <input
        className={styles.input}
        placeholder="Player 1 - M"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
      />

      <input
        className={styles.input}
        placeholder="Player 2 - F"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
      />

      <button
        className={styles.button}
        onClick={() => onStart([name1, name2])}
        disabled={!name1 || !name2}
      >
        Start Game
      </button>
    </div>
  );
}
