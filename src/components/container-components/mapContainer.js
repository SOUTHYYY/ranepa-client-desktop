import { connect } from 'react-redux';
import Map from '../../API/map/map-caller';
import {fetchFromAPI} from "../../redux/actions/api_actions";

const mapStateToProps = state => {
    return {
        auth: state.AuthReducer,
        API: state.APIReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        startFetch: (isUnmounted) => dispatch(fetchFromAPI(isUnmounted)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Map);