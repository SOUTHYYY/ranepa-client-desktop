import { connect } from 'react-redux';
import Timetable from "../timetable/timetable";
import {fetchSearchTimetable, fetchObjectsTimetable} from "../../redux/actions/api_actions";

const mapDispatchToProps = dispatch => {
    return {
        fetchSearch: (type) => dispatch(fetchSearchTimetable(type)),
        fetchLesson: (oid, type, text) => dispatch(fetchObjectsTimetable(oid, type, text))
    }
};

const TimetableStateToProps = state => {
    const { lessonTimetable, searchTimetable, text } = state.APIReducer;
    return {
        lessonTimetable: lessonTimetable,
        searchTimetable: searchTimetable,
        text: text
    }
};

export default connect(TimetableStateToProps, mapDispatchToProps)(Timetable);