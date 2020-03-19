import { connect } from 'react-redux';
import StudentBook from '../student-book/student-book'
import {fetchFromRanepaAPI, clearRanepaPayload} from "../../redux/actions/api_actions";

const mapDispatchToProps = dispatch => {
    return {
        clearData: () => dispatch(clearRanepaPayload()),
        someData: (id) => dispatch(fetchFromRanepaAPI(id))
    }
};

const bookStateToProps = state => {
    return {
        auth: state.AuthReducer,
         API: state.APIReducer
    }
};

export default connect(bookStateToProps, mapDispatchToProps)(StudentBook);