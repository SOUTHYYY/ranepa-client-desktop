import React, { useEffect } from "react";
import styles from "./timetable.module.css";
import TimetableItems from "./timetable-item";
import TimetableLessons from "./timetable-lessons";

export default class Timetable extends React.Component {
  constructor() {
    super();

    this.state = {
      text: "",
      type: "0",
      lessons: [],
      currentLessons: [],
      isTargetSelected: false,
      isLoading: false
    };
  }
  componentWillReceiveProps(nextProps, nextContent) {

    const { text, searchTimetable, lessonTimetable  } = nextProps;

    const { currentLessons } = this.state;

    if (searchTimetable !== this.state.lessons) {
      this.setState({
        lessons: searchTimetable.filter(obj => obj.value.toLowerCase().indexOf(this.state.text.toLowerCase()) > -1),
        isTargetSelected: false,
        isLoading: false
      });
    }
    if (lessonTimetable.length !== currentLessons.length) {
      this.setState({
        currentLessons: lessonTimetable,
        isTargetSelected: true
      });
    }
    if ((text === this.state.text) && (text !== "")) {
      this.setState({
        isTargetSelected: true
      });
    }
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
  };
  handleType = type => {
    this.setState({
      isTargetSelected: false,
      lessons: [],
      type: type
    });
  };
  getSourceData = () => {
    this.props.fetchSearch(this.state.type);
    this.setState({
      isLoading: true
    })
  };
  getLessonsById = oid => {
    this.props.fetchLesson(oid, this.state.type, this.state.text);
  };
  render() {
    const selectorTeacher =
      this.state.type === "1" ? styles.timetable_selector_active : null;
    const selectorStudent =
      this.state.type === "0" ? styles.timetable_selector_active : null;

    const container = this.state.isTargetSelected ? <TimetableLessons data={this.state.currentLessons} /> : this.state.lessons.length ?
        <TimetableItems
            data={this.state.lessons}
            getLesson={this.getLessonsById}
        />
     : null;
    return (
      <div>
        <div className={styles.timetable_wrap_selector}>
          <span
            className={styles.timetable_selector + " " + selectorTeacher}
            onClick={() => this.handleType("1")}
          >
            Учитель
          </span>
          <span
            className={styles.timetable_selector + " " + selectorStudent}
            onClick={() => this.handleType("0")}
          >
            Студент
          </span>
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
        {this.state.isLoading ? <Loading /> : container}
      </div>
    );
  }
}

export const Loading = () => {
  return(
      <div className={styles.loading_circle__container}>
        <i className={styles.loading_circle + ' fas fa-spinner fa-pulse fa-3x'}></i>
      </div>
  )
};

