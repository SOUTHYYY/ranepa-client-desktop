import { connect } from 'react-redux';
import Timetable from "../timetable/timetable";
import axios from "axios";
import {fetchSearchTimetable, fetchObjectsTimetable} from "../../redux/actions/api_actions";

const mapDispatchToProps = dispatch => {
    return {
        fetchSearch: (type) => dispatch(fetchSearchTimetable(type)),
        fetchLesson: (oid, type, text) => dispatch(fetchObjectsTimetable(oid, type, text))
    }
};

const TimetableStateToProps = state => {
    return {
        API: state.APIReducer,
    }
};

export default connect(TimetableStateToProps, mapDispatchToProps)(Timetable);