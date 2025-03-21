import "../css/common.css";
import "../css/rules.css";
import { useNavigate } from "react-router-dom";

function Rules() {
  const navigate = useNavigate();

  // Pre-defined board state for the player board (10 rows x 10 columns)
  const playerBoard = [
    // Row 1
    "",
    "",
    "",
    "",
    "ship",
    "ship",
    "ship",
    "ship",
    "ship",
    "",
    // Row 2
    "",
    "",
    "",
    "",
    "",
    "",
    "ship",
    "ship",
    "",
    "",
    // Row 3
    "",
    "",
    "",
    "hit",
    "",
    "",
    "",
    "",
    "miss",
    "",
    // Row 4
    "",
    "",
    "",
    "",
    "",
    "",
    "ship",
    "ship",
    "ship",
    "",
    // Row 5
    "",
    "",
    "",
    "",
    "",
    "",
    "hit",
    "",
    "",
    "",
    // Row 6
    "ship",
    "ship",
    "ship",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // Row 7
    "",
    "miss",
    "",
    "",
    "",
    "",
    "hit",
    "",
    "",
    "",
    // Row 8
    "",
    "",
    "ship",
    "",
    "",
    "",
    "",
    "",
    "miss",
    "",
    // Row 9
    "",
    "",
    "",
    "",
    "",
    "",
    "ship",
    "ship",
    "",
    "",
    // Row 10
    "",
    "",
    "hit",
    "",
    "",
    "",
    "",
    "",
    "miss",
    "",
  ];

  // Pre-defined board state for the enemy board
  const enemyBoard = [
    // Row 1
    "hit",
    "hit",
    "",
    "",
    "miss",
    "",
    "",
    "hit",
    "miss",
    "",
    // Row 2
    "",
    "",
    "",
    "",
    "",
    "",
    "ship",
    "ship",
    "",
    "",
    // Row 3
    "",
    "",
    "",
    "hit",
    "",
    "",
    "",
    "",
    "miss",
    "",
    // Row 4
    "",
    "",
    "",
    "ship",
    "",
    "",
    "",
    "",
    "",
    "",
    // Row 5
    "",
    "",
    "",
    "",
    "",
    "",
    "hit",
    "",
    "",
    "",
    // Row 6
    "ship",
    "ship",
    "ship",
    "",
    "",
    "",
    "",
    "",
    "ship",
    "ship",
    // Row 7
    "",
    "miss",
    "",
    "",
    "",
    "",
    "hit",
    "",
    "",
    "",
    // Row 8
    "",
    "",
    "ship",
    "",
    "",
    "",
    "",
    "",
    "miss",
    "",
    // Row 9
    "",
    "",
    "",
    "",
    "",
    "",
    "ship",
    "ship",
    "",
    "",
    // Row 10
    "",
    "",
    "hit",
    "",
    "",
    "",
    "",
    "",
    "miss",
    "",
  ];

  return (
    <main className="rules-main-container">
      <h2>Game Rules</h2>
      <ol>
        <li>
          <strong>Objective:</strong> Sink all of your opponent's ships before
          they sink yours.
        </li>
        <li>
          <strong>Setup:</strong> Each player places their fleet of ships on a
          10x10 grid. Ships cannot overlap and must be placed either
          horizontally or vertically.
        </li>
        <li>
          <strong>Fleet Composition:</strong> Each player has the following
          ships:
          <table className="type-table">
            <thead>
              <tr>
                <th>Carrier</th>
                <th>Battleship</th>
                <th>Cruiser</th>
                <th>Destroyers</th>
                <th>Submarines</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>5 spaces</td>
                <td>4 spaces</td>
                <td>3 spaces</td>
                <td>3 spaces each (x2)</td>
                <td>2 spaces each (x2)</td>
              </tr>
            </tbody>
          </table>
        </li>
        <li>
          <strong>Gameplay:</strong>
          <ul>
            <li>Players take turns calling out coordinates (e.g., B4, C7).</li>
            <li>
              If a shot hits a ship, the opponent must declare "Hit." If it
              misses, "Miss."
            </li>
            <li>When all squares of a ship are hit, it's declared "Sunk."</li>
          </ul>
        </li>
        <li>
          <strong>Winning:</strong> The first player to sink all of their
          opponent’s ships wins.
        </li>
      </ol>

      {/* Player Board */}
      <h2>Sample Player Board:</h2>
      <div className="game-board player-board">
        {playerBoard.map((cell, index) => (
          <div key={index} className={`cell ${cell}`}>
            {cell === "hit" ? "✔" : cell === "miss" ? "X" : ""}
          </div>
        ))}
      </div>

      {/* Enemy Board */}
      <h2>Sample Enemy Board:</h2>
      <div className="game-board enemy-board">
        {enemyBoard.map((cell, index) => (
          <div key={index} className={`cell ${cell}`}>
            {cell === "hit" ? "✔" : cell === "miss" ? "X" : ""}
          </div>
        ))}
      </div>

      {/* New Play Game Button */}
      <div className="play-game-container">
        <button className="play-btn" onClick={() => navigate("/game/easy")}>
          Let's Try A Easy Free Play!
        </button>
      </div>

      <section id="credits">
        <h3>Made By</h3>
        <ul>
          <li>
            Email:{" "}
            <a href="mailto:fake.email@example.com">fake.email@example.com</a>
          </li>
          <li>
            GitHub:{" "}
            <a
              href="https://github.com/fakeuser"
              target="_blank"
              rel="noreferrer"
            >
              github.com/fakeuser
            </a>
          </li>
          <li>
            LinkedIn:{" "}
            <a
              href="https://linkedin.com/in/fakeuser"
              target="_blank"
              rel="noreferrer"
            >
              linkedin.com/in/fakeuser
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}

export default Rules;
