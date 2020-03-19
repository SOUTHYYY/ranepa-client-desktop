import React from "react";
import styles from "./timetable.module.css";
import TimetableItems from "./timetable-item";
import {offsets} from "../../offsets/offsets";
import Table from './Table';
import {withSnackbar} from 'notistack';
import Fab from "@material-ui/core/Fab";
import HelpOutlineIcon from '@material-ui/icons/Help';
import SnackMessage from "../snack-message/SnackMessage";


class Timetable extends React.Component {
  constructor(props) {
    super(props);

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
    const { searchTimetable, lessonTimetable  } = nextProps;
    const { currentLessons } = this.state;

    if (searchTimetable !== this.state.lessons) {
      this.setState({
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
  }

  handleChange = e => {
      if(!this.props.searchTimetable.length) {
        this.props.fetchSearch(this.state.type);
      }
    this.setState({
      text: e.target.value,
      lessons: e.target.value === "" ? [] : this.props.searchTimetable.filter(obj => obj.value.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1)
    });
  };
  handleType = type => {
    this.props.searchClear();
    this.setState({
      isTargetSelected: false,
      lessons: [],
      type: type
    });
  };
  getLessonsById = oid => {
    this.props.fetchLesson(oid, this.state.type);
  };
  render() {
    const selectorTeacher =
      this.state.type === "1" ? styles.timetable_selector_active : null;
    const selectorStudent =
      this.state.type === "0" ? styles.timetable_selector_active : null;

    const container = this.state.isTargetSelected ? <Table data={this.state.currentLessons} /> : this.state.lessons.length ?
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
            {offsets.timetable.teacher}
          </span>
            <span
                className={styles.timetable_selector + " " + selectorStudent}
                onClick={() => this.handleType("0")}
            >
            {offsets.timetable.student}
          </span>
          </div>
          <div className={styles.timetable_header}>
            <input
                className={styles.timetable_input}
                placeholder={offsets.timetable.labelSearch}
                name="tableSearch"
                onChange={this.handleChange}
            />
            <Fab aria-label="add" style={{backgroundColor: '#951a1d'}} onClick={() => this.props.enqueueSnackbar('Подсказка', {
              anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'right',
            },
              content: (key, message) => (
              <SnackMessage id={key} message={message} />
              )
            })}>
              <HelpOutlineIcon style={{color: '#fff'}} />
            </Fab>
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

export default withSnackbar(Timetable)
