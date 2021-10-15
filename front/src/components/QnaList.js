import React, { Component } from "react";
import {TableRow, TableCell, TableBody, Input, Table} from '@material-ui/core';
import moment from 'moment';  // 날짜타입
import '../css/qna.css';

class QnaList extends Component {
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

        return(
            <div>
                <details className = "qna_detail">
                <summary>
                <Table>
                    <TableBody>
                    <TableRow>
                        <TableCell width="12%" > {this.props.rnum} </TableCell>
                        <TableCell width="14%" > {this.props.cust_id} </TableCell>
                        <TableCell width="11%" > {this.props.cust_nm}</TableCell>
                        <TableCell width="15%" > {this.props.qna_title}</TableCell>
                        <TableCell width="15%" > {this.props.qna_content}</TableCell>
                        <TableCell width="18%" > {this.props.qna_kind}</TableCell>
                        <TableCell width="15%" >{moment(this.props.qna_dt).format('YYYY-MM-DD hh:mm')}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </summary>
                <div>
                    <form action='/admin/qnaadd' method="POST">
                        <Table>
                            <TableBody>
                                <TableRow> 
                                    <TableCell colSpan="6" align="center">
                                        <Input type="textarea" name="qna_answer"  placeholder="내용을 입력하세요." style = {{width:"800px"}}/>
                                    </TableCell>
                                    <TableCell>
                                        {/* Input : @material-ui/core에서 제공하는 input box로 라인형태로 제공
                                            input :  */}
                                        <input type = "hidden" name = "qna_cd" value = {this.props.qna_cd} />
                                        <input class="btn" type="submit" value="답변하기" color="secondary" />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </form>
                </div>
                </details>
            </div>
        );
    }


}

export default QnaList;