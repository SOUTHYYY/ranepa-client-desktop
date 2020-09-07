import React from "react";
import styles from "./student.module.css";
import {Loading} from "../timetable/timetable";
import {offsets} from "../../offsets/offsets";
import MaterialTableDemo from "./Table";


class Book extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      propsText: '',
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

  componentWillUnmount() {
      this.props.clearData();
  }

    render() {
      const { bookmarks } = this.props.API;
    return (
      <div className={styles.studentBook_content}>
        <div className={styles.studentBook_header}>
          <input
            className={styles.studentBook_input}
            placeholder={offsets.studBook.placeholderSearch}
            name="tableSearch"
            onChange={this.handleChange}
          />
          <span
            className={styles.studentBook_Button}
            onClick={() => {
              this.props.someData(this.state.text);
              this.setState({
                isLoading: true,
                  propsText: this.state.text
              })
            }}
          >
            <i
              className={"fas fa-search fa-2x " + styles.studentBook_searchIcon}
            />
          </span>
        </div>
        {(this.state.isLoading && this.props.API.bookmarks.length === 0) ? <Loading/> : bookmarks.length ?
            <div className={styles.studentBooK_tableContent}>
              <MaterialTableDemo data={this.props} text={this.state.propsText}/>
            </div>
            :
            null}
      </div>
    );
  }
}

export default Book;
