import {useHistory} from "react-router-dom"

const GamePage = () => {
  const history = useHistory();

  const handleBackToHomePage = () => history.push("/");
  return (
    <div>
      <button onClick={handleBackToHomePage}>Back to HomePage</button>
    </div>
  );
};

export default GamePage;
