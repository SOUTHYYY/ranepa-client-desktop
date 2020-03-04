import React from 'react';
import styles from "./timetable.module.css";
// {array[index - 1] == null ? <h2>{item.xdt} число</h2> : array[index - 1].xdt === item.xdt ? null : <h2>{item.xdt} число</h2>}
// <tr key={index}>
//                 <td className={styles.timetable_Content_text_lessons}>
//                     <h4>{item.teacher}</h4>
//                     <p><i className="fas fa-location-arrow"></i> {item.audit}</p>
//                     <p><i className="far fa-clock"></i> {item.time}</p>
//                     <p><i className="fas fa-book"></i> {item.lesson}</p>
//                 </td>
//             </tr>

export default class TimetableLessons extends React.Component{
    render() {
        let count_lesson = 1;
        const headerDate = (date, index) => {
            return <h2 className={styles.timetable_Content_text_header}>{date}</h2>
        };

        let lessons = this.props.data.map((item, index, array) => {
            return <tr key={index}>
                <td>
                    <p className={styles.timetable_dayCounter}>
                        {array[index - 1] == null ? count_lesson : array[index - 1].xdt === item.xdt ? ++count_lesson : count_lesson = 1} пара
                    </p>
                </td>
                <td className={styles.timetable_Content_text_lessons + ' ' +  styles.timetable_td_text_lessons}>
                    {array[index - 1] == null ? headerDate(item.dayOfWeek) : array[index - 1].xdt === item.xdt ? null : headerDate(item.dayOfWeek)}
                    <h4>{item.teacher}</h4>
                    <p><i className="fas fa-location-arrow"></i> {item.audit}</p>
                    <p><i className="far fa-clock"></i> {item.time}</p>
                    <p><i className="fas fa-book"></i> {item.lesson}</p>
                </td>
            </tr>

        });
        return(
            <div className={styles.timetable_list_wrapper_lesson}>
                <table cellSpacing={12}>
                    <tbody>
                    {lessons.length ? lessons : <h2>Данные не найдены!</h2>}
                    </tbody>
                </table>
            </div>
        )
    }
}
