import React, { Component } from "react";
import {TableRow, TableCell} from '@material-ui/core';
import moment from 'moment';  // 날짜타입

class MemberList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
            show_update: "block",
            show_delete: "none"
        }
    }

    // 수정버튼 클릭
    displayUpdateClick = (e) => {
        this.setState({
            show_update: "block",
            show_delete: "none"
        })
    }


    // 삭제버튼 클릭
    displayDeleteClick = (e) => {
        this.setState({
            show_update: "none",
            show_delete: "block"
        });
    } 


    // Input : @material-ui/core에서 제공하는 input box로 라인형태로 제공
    // Input : html 태그
    render() {

        console.log(" 요기 : " + this.props.cust_id);

        return(
            <TableRow>
                <TableCell  name="board_no" value={this.props.rnum}> {this.props.rnum} </TableCell>
                <TableCell name="board_title"> {this.props.cust_id} </TableCell>
                <TableCell name="board_content"> {this.props.cust_nm}</TableCell>
                <TableCell name="board_email"> {this.props.author}</TableCell>
                <TableCell name="board_regdate">{moment(this.props.cust_dt).format('YYYY-MM-DD hh:mm')}</TableCell>
            </TableRow>
        );
    }


}

export default MemberList;