import React from "react";
import styles from "./student.module.css";
import BookItems from "./book-items";
import {Loading} from "../timetable/timetable";

class Book extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isLoading: false
    }
  }
  handleChange = (e) => {
      this.setState({
        text: e.target.value,
      })
  };
  componentWillReceiveProps(nextProps, nextContext) {
    if(nextProps.API.bookmarks.length > 0) {
      this.setState({
        isLoading: false
      })
    }

  }

  render() {
      const { bookmarks } = this.props.API;
      const headerBook = <div className={styles.studentBooK_tableHead}>
        <span style={{marginLeft: "15px"}} className={styles.studentBooK_tableHead_text}>№</span>
        <span style={{marginLeft: "40px"}} className={styles.studentBooK_tableHead_text}>Курс</span>
        <span style={{marginLeft: "40px"}} className={styles.studentBooK_tableHead_text}>Предмет</span>
        <span style={{marginLeft: "380px"}} className={styles.studentBooK_tableHead_text}>Тип зачета</span>
        <span style={{marginLeft: "167px"}} className={styles.studentBooK_tableHead_text}>Оценка</span>
      </div>;
    return (
      <div className={styles.studentBook_content}>
        <div className={styles.studentBook_header}>
          <input
            className={styles.studentBook_input}
            placeholder="Поиск"
            name="tableSearch"
            onChange={this.handleChange}
          />
          <span
            className={styles.studentBook_Button}
            onClick={() => {
              this.props.someData(this.state.text);
              this.setState({
                isLoading: true
              })
            }}
          >
            <i
              className={"fas fa-search fa-2x " + styles.studentBook_searchIcon}
            />
          </span>
        </div>
        {(this.state.isLoading && this.props.API.bookmarks.length === 0) ? null : bookmarks.length ?
            headerBook
            :
            null }
        {(this.state.isLoading && this.props.API.bookmarks.length === 0) ? <Loading/> : bookmarks.length ?

            <div className={styles.studentBooK_tableContent}>
              <BookItems data={this.props}/>
            </div>
            :
            null}


      </div>
    );
  }
}

export default Book;
