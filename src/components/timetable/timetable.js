import React from 'react';
import styles from './timetable.module.css'
import RanepaService from "../../API/ranepa/ranepa-services";
import TimetableItems from "./timetable-item";
import TimetableLessons from "./timetable-lessons";



export default class Timetable extends React.Component {
    ranepaService = new RanepaService();
    constructor() {
        super();

        this.state = {
            text: '',
            type: '0',
            lessons: [],
            currentLessons: [],
            isTargetSelected: false
        };
    }

    handleChange = (e) => {
        this.setState({text: e.target.value})
    };
    handleType = (type) => {
        this.setState({
            isTargetSelected: false,
            lessons: [],
            currentLessons: [],
            type: type
        })
    };
    getSourceData = () => {
        this.ranepaService.getGroupOrTeacher(this.state.type)
            .then((res) => {
                this.setState({
                    lessons: res.filter((obj) => obj.value.toLowerCase().indexOf(this.state.text.toLowerCase()) > -1)})});
    };
    getLessonsById = (oid) => {
       this.ranepaService.getResource(oid, this.state.type).then((res) => this.setState({
           currentLessons: res,
           isTargetSelected: true
       }));
    };
    render() {
        const selectorTeacher = this.state.type === '1' ? styles.timetable_selector_active : null;
        const selectorStudent = this.state.type === '0' ? styles.timetable_selector_active : null;

        return(
            <div>
                <div className={styles.timetable_wrap_selector}>
                    <span className={styles.timetable_selector + ' ' + selectorTeacher} onClick={() => this.handleType("1")}>Учитель</span>
                    <span className={styles.timetable_selector + ' ' + selectorStudent} onClick={() => this.handleType("0")}>Студент</span>
                </div>
                <div className={styles.timetable_header}>
                <input
                    className={styles.timetable_input}
                    placeholder="Поиск"
                    name="tableSearch"
                    onChange={this.handleChange}
                />
                <span
                    className={styles.timetable_Button}
                    onClick={() => this.getSourceData()}
                >
            <i
                className={"fas fa-search fa-2x " + styles.timetable_searchIcon}
            />
          </span>
            </div>
                {this.state.isTargetSelected ?
                    <TimetableLessons data={this.state.currentLessons}/>
                    :
                    this.state.lessons.length
                        ? <TimetableItems data={this.state.lessons} getLesson={this.getLessonsById} />
                        :
                        null}
        </div>

        )
    }
}