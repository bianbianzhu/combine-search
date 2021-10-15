import React from "react";
import "./ResultList.scss";

const ResultList = ({ incidents, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Incident</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {incidents.map((incident) => {
          //     let fullName;
          //   const rightUser = users.find(
          //     (user) => user.user_id === incident.user_id
          //   );
          //   if (rightUser) {
          //     fullName = rightUser.first_name + " " + rightUser.last_name;
          //   } else {
          //     fullName = "This user doesn't exist" // 这个防止incident中的user id 在user里面找不到
          //   }

          return (
            <tr key={incident.incident_id}>
              <td>{incident.name}</td>
              <td>
                {users.find(({ user_id }) => user_id === incident.user_id)
                  ?.first_name || "this user is not here"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ResultList;
