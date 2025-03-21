import "../css/common.css";
import "../css/highscores.css";

function HighScores() {
  return (
    <main>
      <h2>High Scores</h2>
      <p>Check out our top players and see who’s ruling the seas!</p>
      <table className="highscores-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Wins</th>
            <th>Losses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className="highlight">1</span>
            </td>
            <td>CaptainNemo</td>
            <td>15</td>
            <td>3</td>
          </tr>
          <tr>
            <td>
              <span className="highlight">2</span>
            </td>
            <td>SeaWolf</td>
            <td>12</td>
            <td>5</td>
          </tr>
          <tr>
            <td>
              <span className="highlight">3</span>
            </td>
            <td>AdmiralX</td>
            <td>10</td>
            <td>7</td>
          </tr>
          <tr>
            <td>
              <span className="highlight">4</span>
            </td>
            <td>ShipMaster</td>
            <td>9</td>
            <td>8</td>
          </tr>
          <tr>
            <td>
              <span className="highlight">5</span>
            </td>
            <td>BattleMage</td>
            <td>8</td>
            <td>10</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default HighScores;
