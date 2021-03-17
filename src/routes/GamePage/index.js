const GamePage = ({ onChangePage }) => {
  const handleBackToHomePage = (pageName = "app") => {
    onChangePage && onChangePage(pageName);
  };
  return (
    <div>
      This is Game Page!
      <button onClick={handleBackToHomePage}>Back to HomePage</button>
    </div>
  );
};

export default GamePage;
