import React, {Component} from 'react';
import styles from './timetable.module.css';


export default class TimetableItems extends Component {

    render() {
        let items = this.props.data.map((item, idx) => {
            return <tr key={idx}>
                <td align={"left"} className={styles.timetable_tableHead_text}>{idx + 1}</td>
                <td className={styles.timetable_Content_text} onClick={() => this.props.getLesson(item.oid)}>{item.value}</td>
            </tr>
        });
        return (<div className={styles.timetable_list_wrapper}>
                <table>
                <tbody style={{overflow: "scroll"}}>
                {items}
                </tbody>
            </table>
        </div>
        );
    }
}