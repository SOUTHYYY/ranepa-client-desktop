import React from "react";
import styles from "./student.module.css";
import { fetchFromRanepaAPI } from "../../redux/actions/api_actions";
import BookItems from "./book-items";

class Book extends React.Component {
  constructor() {
    super();
    this.state = {text: ''}
  }
  handleChange = (e) => {
      this.setState({text: e.target.value})
  }
  render() {
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
            onClick={() => this.props.someData(this.state.text)}
          >
            <i
              className={"fas fa-search fa-2x " + styles.studentBook_searchIcon}
            />
          </span>
        </div>

        <div className={styles.studentBooK_tableContent}>
          <BookItems data={this.props}/>
        </div>
      </div>
    );
  }
}

export default Book;
