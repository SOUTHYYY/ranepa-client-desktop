import React, {Component} from 'react';
import styles from "./profile-table.module.css";
import MarkerItem from "./marker-item/marker-item";

class ProfileTable extends Component {
    render() {
        const items = this.props.data.map((item, idx) => {
            return <MarkerItem key={idx} idx={idx} item={item}/>
        })
        return (
            <table className={styles.marks__table}>
                <tbody>
                {items}
                </tbody>
            </table>
        );
    }
}

export default ProfileTable;