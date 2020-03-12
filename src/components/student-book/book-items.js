import React, { Component } from "react";
import MarkItem from "../student-book/mark-item";

class BookItems extends Component {
  render() {
      let items = this.props.data.API.bookmarks.map((item, idx) => {
          return <MarkItem key={idx} idx={idx} item={item}/>
      });

      if(!this.props.data.API.bookmarks) return <p>Пиздец</p>;
    return (
      <table>
        <tbody>
        {items}
        </tbody>
      </table>
    );
  }
}

export default BookItems;
