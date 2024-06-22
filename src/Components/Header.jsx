import { useContext, useEffect, useState } from "react";
import AllArticles from "./AllArticles";
import { UserContext } from "../contexts/User";
import { getAllUsers } from "../api";
import "../App.css";

const Header = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    users,
    setUsers,
    username,
    setUsername,
    loginStatus,
    setLoginStatus,
  } = useContext(UserContext);

  useEffect(() => {
    getAllUsers().then((usersFromApi) => {
      setUsers(usersFromApi);
      setIsLoading(false);
    });
  }, [setUsers]);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const userExists = users.some((user) => user.username === username);
    if (userExists) {
      setLoginStatus(true);
    } else {
      alert("Invalid username. Please try jessjelly.");
    }
  };
  const handleOnChange = (e) => {
    setUsername(e.target.value);
  };

  return (
    <>
      <div className="top-nc-logo">
        <img
          src="/nsnews-logo.png"
          border="0"
          alt="NC news logo"
          className="nc-logo"
        />
        {isLoading ? (
          <p className="warning">
            Bear with us, loading data from the database
          </p>
        ) : (
          ""
        )}
        {loginStatus ? (
          <p>{`you are logged as ${username}`}</p>
        ) : (
          <p>
            please login with test username : <b>jessjelly</b>
          </p>
        )}
      </div>
      <section className="top-header">
        {!loginStatus ? (
          <form onSubmit={handleOnSubmit}>
            <label htmlFor=""></label>
            <input
              type="text"
              placeholder="username"
              onChange={handleOnChange}
            />
            <button type="submit">login</button>
          </form>
        ) : (
          <>
            <AllArticles />
          </>
        )}
      </section>
    </>
  );
};

export default Header;
