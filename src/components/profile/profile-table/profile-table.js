import React, {Component} from 'react';
import styles from "./profile-table.module.css";
import MarkerItem from "./marker-item/marker-item";

class ProfileTable extends Component {

    state = {
        data: []
    };
    deleteMarkArr = (id) => {
        this.state.data.splice(id, 1);
        this.setState({data: this.state.data})
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.data != this.state.data) {
            this.setState({data: nextProps.data});
        }
    }
    render() {

        return (
            <table className={styles.marks__table}>
                <tbody>
                {this.state.data.map((item, idx) => {
                    return <MarkerItem key={idx} idx={idx} item={item} deleteMark={this.deleteMarkArr}/>
                })}
                </tbody>
            </table>
        );
    }
}

export default ProfileTable;