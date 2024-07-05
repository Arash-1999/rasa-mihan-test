import styles from "./page.module.css";
import MarketTicker from "@/components/market-ticker";

export default function Home() {
  return (
    <main className={styles.main}>
      <MarketTicker />
    </main>
  );
}
