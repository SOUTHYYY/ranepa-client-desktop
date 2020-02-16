import React from "react";

const markItem = ({ item, idx }) => {
  debugger;
  const { course, subject, type, mark } = item;
  return (
    <tr>
      <td align={"left"}>
        <i className="fas fa-book"></i>
      </td>
      <td>{course} курс</td>
      <td>{subject}</td>
      <td>{type}</td>
      <td>{mark}</td>
    </tr>
  );
};
export default markItem;
