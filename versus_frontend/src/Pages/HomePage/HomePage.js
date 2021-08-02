import React, { useState } from "react";
import Card from "../Card/Card";
import Header from "../../Components/Header/Header";
import { useParams } from "react-router-dom";
import SpotBattle from "../SpotBattle/SpotBattle";
import TokenBattle from "../TokenBattle/TokenBattle";
import Leaderboard from "../Leaderboard/Leaderboard";
import Badges from "../Badges/Badges";

const HomePage = () => {
  const { typeId } = useParams();
  const [openHistory, setOpenHistory] = useState(false);

  return (
    <div>
      <Header />
      {typeId === "spotBattle" && (
        <SpotBattle openHistory={openHistory} setOpenHistory={setOpenHistory} />
      )}
      {typeId === "tokenBattle" && (
        <TokenBattle
          openHistory={openHistory}
          setOpenHistory={setOpenHistory}
        />
      )}
      {typeId === "leaderboard" && <Leaderboard />}
      {typeId === "badges" && <Badges />}
    </div>
  );
};

export default HomePage;
