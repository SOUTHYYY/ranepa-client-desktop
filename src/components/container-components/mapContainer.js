import { connect } from 'react-redux';
import Map from '../../API/map/map-caller';
import {fetchFromAPI, fetchPolygonData} from "../../redux/actions/api_actions";

const mapStateToProps = state => {
    return {
        auth: state.AuthReducer,
        API: state.APIReducer
    }
};

const mapDispatchToProps = dispatch => {
    return {
        startFetch: () => dispatch(fetchFromAPI()),
        startPolygonFetch: () => dispatch(fetchPolygonData())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Map);