import { useContext, useEffect } from "react";
import AllArticles from "./AllArticles";
import { UserContext } from "../contexts/User";
import { getAllUsers } from "../api";

const Header = () => {
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
      console.log(usersFromApi);
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
          src="https://i.ibb.co/7VhTGj8/NCnews-logo.png"
          border="0"
          alt="NC news logo"
          className="nc-logo"
        />
        {loginStatus ? <p>{`you are logged as ${username}`}</p> : ""}
      </div>
      <section className="top-header">
        {!loginStatus ? (
          <form onSubmit={handleOnSubmit}>
            <label htmlFor="">test username : jessjelly </label>
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
