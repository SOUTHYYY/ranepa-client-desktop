import axios from 'axios';

// http://services.niu.ranepa.ru/API/public/group/15834/schedule/21.1.2020/27.1.2020


export default class RanepaService {

    _api = 'http://services.niu.ranepa.ru/API/public/group/';
    _api_group = 'http://services.niu.ranepa.ru/API/public/teacher/teachersAndGroupsList/';



    getResource = async (id, firstDate, secondDate) => {
        const res = await axios.get(`${this._api}${id}/schedule/${firstDate}/${secondDate}`);

        return res.data.map((el) => this._transformData(el));
    };

    _extractData(data) {
        const DataRegExp = /[0-9].......([0-9]*)/;
        return data.xdt.match(DataRegExp)[1];
    }
    async getGroups() {
        const res = await axios.get(this._api_group);

        return res.data;
    }

    _transformData = (data) => {
        return {
            teacher: data.teacher,
            audit: data.number,
            lesson: data.subject,
            type: data.type,
            time: data.nf + ' - ' + data.kf,
            xdt: this._extractData(data)
        };
    };
}