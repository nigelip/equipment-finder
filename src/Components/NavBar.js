const NavBar = () => {
  return (
    <nav className="navbar">
      <h1>The AF Guide</h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/searchequipment">Search Equipment</a>
        <a href="/searchgym">Search Gym</a>
      </div>
    </nav>
  );
};

export default NavBar;
