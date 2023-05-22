function Header() {
  return (
    <div className="title-container">
      <div className="featured-img">
        <span className="title">Pieworks Admin Dashboard</span>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("appHeader")).render(<Header />);
