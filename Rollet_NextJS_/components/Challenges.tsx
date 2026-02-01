import styles from "./Challenges.module.css";

export default function Challenges({
  player,
  challenge,
  onNext,
}: {
  player: string;
  challenge: string;
  onNext: () => void;
}) {
  return (
    <div className={styles.container}>
      <h2 className={styles.playerName}>{player}</h2>
      <p className={styles.challengeText}>{challenge}</p>
      <button className={styles.nextButton} onClick={onNext}>
        Next Challenge
      </button>
    </div>
  );
}
