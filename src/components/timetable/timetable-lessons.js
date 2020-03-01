import React from 'react';
import styles from "./timetable.module.css";


export default class TimetableLessons extends React.Component{
    render() {
        let lessons = this.props.data.map((item, index, array) => {
            return <tr key={index}>
                <td className={styles.timetable_Content_text_lessons}>
                    {array[index - 1] == null ? <h2>{item.xdt} число</h2> : array[index - 1].xdt === item.xdt ? null : <h2>{item.xdt} число</h2>}
                    <h4>{item.teacher}</h4>
                    <p><i className="fas fa-location-arrow"></i> {item.audit}</p>
                    <p><i className="far fa-clock"></i> {item.time}</p>
                    <p><i className="fas fa-book"></i> {item.lesson}</p>
                </td>
            </tr>
        });
        return(
            <div className={styles.timetable_list_wrapper_lesson}>
                <table>
                    <tbody>
                    {lessons.length ? lessons : <h2>Данные не найдены!</h2>}
                    </tbody>
                </table>
            </div>
        )
    }
}
