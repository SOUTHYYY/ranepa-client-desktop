import axios from 'axios';

// http://services.niu.ranepa.ru/API/public/group/15834/schedule/21.1.2020/27.1.2020


export default class RanepaService {

    _api = 'http://services.niu.ranepa.ru/API/public/';
    _api_group = 'http://services.niu.ranepa.ru/API/public/teacher/teachersAndGroupsList/';



    getResource = async (id, type) => {
        const res = await axios.get(`${this._api}${type === '1' ? 'teacher/' : 'group/'}${id}/schedule/${this.getCurrentDate()}/${this.getPlus7Date()}`);
        debugger;
        return res.data.map((el) => this._transformData(el));
    };

    _extractData(data) {
        const DataRegExp = /[0-9].......([0-9]*)/;
        return data.xdt.match(DataRegExp)[1];
    }
    async getGroupOrTeacher(type) {
        const res = await axios.get(this._api_group)
            .then((res) => res.data.filter((obj) => obj.type == type));
        return res;
    }
    getCurrentDate(separator=''){

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        return `${date}.${month<10?`0${month}`:`${month}`}.${year}`
    }
    getPlus7Date(separator=''){

        let newDate = new Date();
        let date = newDate.getDate() + 7 - (newDate.getDate()+7 >= 31? 31 : 0);
        let month = newDate.getMonth() + 1 + (date + 31 >= 31 ? 1 : 0);
        let year = newDate.getFullYear();

        return `${date}.${month<10?`0${month}`:`${month}`}.${year}`
    }

    _transformData = (data) => {
        return {
            teacher: data.teacher || data.group,
            audit: data.number,
            lesson: data.subject,
            type: data.type,
            time: data.nf + ' - ' + data.kf,
            xdt: this._extractData(data)
        };
    };
}