import React, {forwardRef, useRef} from 'react';
import styles from './student.module.css';
import MaterialTable from 'material-table';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from "react-to-print";
import PrintComponents from 'react-print-components';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default function MaterialTableDemo(props) {
    let componentRef = useRef();
    const state = {
        columns: [
            { title: 'Курс', field: 'course'},
            { title: 'Тип', field: 'type'},
            { title: 'Предмет', field: 'subject' },
            { title: 'Оценка', field: 'mark', type: 'numeric', width: 80, render: rowData => rowData.mark === "" ? <span>-</span> : <span style={mark(rowData.mark)}>{rowData.mark}</span> }
        ],
        data: props.data.API.bookmarks,
    };
    
    const mark = (markData) => {
        const defStyles = {padding: '5px', borderRadius: '40px'};
        switch (markData) {
            case 'хорошо':
                return {backgroundColor: '#ffff0073', ...defStyles};
            case 'отлично':
                return {backgroundColor: '#017d0187', ...defStyles};
            case 'зачет':
                return {backgroundColor: '#017d0187', ...defStyles};
            case 'удовлетворительно':
                return {backgroundColor: '#ff5346b5', ...defStyles};
            default:
                break;
        }
    };

    return (
        <MaterialTable
            actions={[
                {
                    icon: () => <PrintComponents
                        trigger={<PrintIcon/>}
                    >
                        <h2>Зачетная книжка: {props.text}</h2>
                        <table className={styles.book_collapse}>
                            <tr>
                                <th className={styles.book_td}>Курс</th>
                                <th className={styles.book_td}>Предмет</th>
                                <th className={styles.book_td}>Оценка</th>
                            </tr>
                            {
                            props.data.API.bookmarks.map((el) => <tr>
                                <td className={styles.book_td}>{el.course}</td>
                                <td className={styles.book_td}>{el.subject}</td>
                                <td className={styles.book_td}>{el.mark}</td>
                            </tr>)}
                        </table>

                    </PrintComponents>,
                    tooltip: 'Печать',
                    isFreeAction: true
                }
            ]}
            tableRef={el => (componentRef = el)}
            icons={tableIcons}
            title={'Зачетная книжка ' + props.text}
            columns={state.columns}
            data={state.data}
            options={{
                exportAllData: true,
                exportDelimiter: " ",
                grouping: true,
                exportButton: true,
                pageSizeOptions: []
            }}
            style={{borderRadius: '10px'}}
            localization={{
                grouping: {
                    placeholder: "Перетащите заголовок для фильтрации в виде дерева",
                    groupedBy: "Отсортировано: "
                },
                pagination: {
                    labelRowsSelect: 'Строки',
                    firstAriaLabel: 'Первая строка',
                    firstTooltip: 'Первая строка',
                    previousAriaLabel: 'Предыдущая строка',
                    previousTooltip: 'Предыдущая строка',
                    nextAriaLabel: 'Следующая строка',
                    nextTooltip: 'Следующая строка',
                    lastAriaLabel: 'Последняя строка',
                    lastTooltip: 'Последняя строка'
                },
                toolbar: {
                    searchPlaceholder: 'Поиск',
                    searchTooltip: 'Поиск',
                    exportAriaLabel: 'Экспорт таблицы',
                    exportName: 'Экспорт .CSV',
                    exportTitle: 'Экспорт таблицы'
                }
            }}
        />
    );
}
