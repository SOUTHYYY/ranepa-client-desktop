import React, {Component} from 'react';
import styles from './profile.module.css'
import ProfileTable from './profile-table';
import ButtonUI from '@material-ui/core/Button';
import {offsets} from "../../offsets/offsets";
import Popover from "./Popover";

class Profile extends Component {

    handleLogout = () => {
        this.props.logout()
    };


    render() {

        return (
            <div className={styles.profile}>
                <div className={styles.content}>
                    <div className={styles.marks}>
                        <div className={styles.personInfo}>
                            <div className={styles.personInfo__header}>
                                <img src={this.props.icon} alt={'logo'}/>
                                <span>{this.props.siteName}</span>
                                {this.props.vkData === 'failed' ? null : <Popover vkData={this.props.vkData} />}
                            </div>
                            <div className={styles.personInfo__settings}>
                                <ButtonUI variant="contained" disabled>
                                    {offsets.profile.changePasswordLabel}
                                </ButtonUI>
                                <ButtonUI variant="contained" onClick={() => this.handleLogout()}>{offsets.profile.logoutLabel}</ButtonUI>
                            </div>
                        </div>
                        <div>
                            <h1>{offsets.profile.labelMyProfile}</h1>
                            <h3>{offsets.profile.labelMyMarks}</h3>
                            <ProfileTable data={this.props.userPins} loading={this.props.loader}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;