import React from "react";

const SearchSection = ({ users, searchParam, setSearchParam }) => {
  const selectionChangeHandler = (e) => {
    setSearchParam({ ...searchParam, user_id: e.target.value });
  };

  const inputChangeHandler = (e) => {
    setSearchParam({ ...searchParam, incident_name: e.target.value });
  };

  return (
    <section>
      <form action="">
        <input
          type="text"
          onChange={inputChangeHandler}
          value={searchParam.incident_name}
        />
        <select onChange={selectionChangeHandler} value={searchParam.user_id}>
          <option value="">User</option>
          {users.map((user) => {
            return (
              <option value={user.user_id} key={user.user_id}>
                {user.first_name + " " + user.last_name}
              </option>
            );
          })}
        </select>
      </form>
    </section>
  );
};

export default SearchSection;
