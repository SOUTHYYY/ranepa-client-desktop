import React from 'react';
import styles from "./timetable.module.css";

export default class TimetableLessons extends React.Component{
    render() {

        let Peoples = this.props.data.map((item) => { return item.dayOfWeek});
        Peoples = Peoples.filter((item, index) => Peoples.indexOf(item) === index);

        let lesssons_data = Peoples.map((item, index, array) => {
            let dayCounter = 1;
            let day = this.props.data.map((lesson, index, array) => {
                if(lesson.dayOfWeek !== item) return null;
                return <React.Fragment>
                <div id={styles.lesson_header} key={index}>
                    <div>
                        <p><i className="fas fa-book"></i> {lesson.lesson}</p>
                        <p id={styles.dayCounter}>{dayCounter++}</p>
                    </div>
                </div>
                    <div id={styles.lesson_description}>
                        <p><i className="fas fa-user-alt"></i> {lesson.teacher}</p>
                        <p><i className="fas fa-location-arrow"></i> {lesson.audit}</p>
                        <p><i className="far fa-clock"></i> {lesson.time}</p>
                    </div>
                    </React.Fragment>
            });
            return <tr key={index}>
                <td className={styles.timetable_Content_text_lessons + ' ' +  styles.timetable_td_text_lessons}>
                    <h2 className={styles.timetable_Content_text_header}>{item}</h2>
                    {day}
                </td>
            </tr>
        });

        if(!lesssons_data.length) return <h2>Данные не найдены!</h2>;
        return(
            <div className={styles.timetable_list_wrapper_lesson}>
                <table cellSpacing={100}>
                    <tbody>
                    {lesssons_data}
                    </tbody>
                </table>
            </div>
        )
    }
}