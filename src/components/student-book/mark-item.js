import React from "react";
import styles from "./student.module.css";

const markItem = ({ item, idx }) => {
  const { course, subject, type, mark } = item;
  return (
    <tr className={styles.book_tr}>
      <td align={"left"} className={styles.studentBooK_tableHead_text}>{idx}</td>
      <td className={styles.studentBooK_Content_text}>{course} курс</td>
      <td className={styles.studentBooK_tableHead_text}>{subject}</td>
      <td className={styles.studentBooK_Content_text}>{type}</td>
      <td className={styles.studentBooK_tableHead_text}>{mark ? mark : 'нет данных'}</td>
    </tr>
  );
};
export default markItem;
