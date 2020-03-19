import { connect } from 'react-redux';
import Timetable from "../timetable/timetable";
import {
    fetchSearchTimetable,
    fetchObjectsTimetable,
    payloadSearchTimetableClear
} from "../../redux/actions/api_actions";
import React, {Component} from "react";

const mapDispatchToProps = dispatch => {
    return {
        fetchSearch: (type) => dispatch(fetchSearchTimetable(type)),
        fetchLesson: (oid, type) => dispatch(fetchObjectsTimetable(oid, type)),
        searchClear: () => dispatch(payloadSearchTimetableClear())
    }
};

class dispatchTimetable extends Component {

    render() {
        return <Timetable {...this.props}/>
    }
}

const TimetableStateToProps = state => {
    const { lessonTimetable, searchTimetable, text } = state.APIReducer;
    return {
        lessonTimetable: lessonTimetable,
        searchTimetable: searchTimetable,
        text: text
    }
};

export default connect(TimetableStateToProps, mapDispatchToProps)(dispatchTimetable);