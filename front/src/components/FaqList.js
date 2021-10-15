import React, { Component } from "react";
import {TableRow, TableCell, TableBody, Input} from '@material-ui/core';

class FaqList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
            show_ut: true
        }
    }

    updatelist = (e) => {
        this.setState({
            show_ut: false
        });
    }

    backlist = (e) => {
        this.setState({
            show_ut: true
        });
    }

    deletfee = (e) => {

        const axios = require('axios');

        axios.post('/admin/fqadel', {
            faq_cd: this.props.sf_cd
        })
        .then(function (response){
            console.log(response.data);
        })
        .catch(function (error){
            console.log(error);
        });
        window.location.reload();
    }


    // Input : @material-ui/core에서 제공하는 input box로 라인형태로 제공
    // Input : html 태그
    render() {

        return(
            <TableBody className = "faq_body">
                <TableRow  style = {{display:this.state.show_ut ? 'inline' : 'none'}}>
                    <TableCell> {this.props.rnum} </TableCell>
                    <TableCell> {this.props.faq_title} </TableCell>
                    <TableCell> {this.props.faq_content}</TableCell>
                    <TableCell> {this.props.faq_kind}</TableCell>
                    <TableCell> <input class="btn btn2" type = "button" value = "수정" color="secondary" onClick = {this.updatelist}/> </TableCell>
                    <TableCell> <input class="btn btn2" type = "button" value = "삭제" color="secondary" onClick = {this.deletfee}/> </TableCell>
                </TableRow>
        
                <TableRow style = {{display:this.state.show_ut ? 'none' : 'inline'}}>
                    <TableCell> {this.props.rnum} </TableCell>
                    <TableCell colSpan = "4"> 
                        <form action="/admin/faqmodi" method="post"  className = "faq_cen2">
                            <input type = "hidden" name = "faq_cd" value = {this.props.faq_cd}></input>
                            <Input type = "text" name = "faq_title" placeholder = {this.props.faq_title}></Input>
                            <Input type = "text" name = "faq_content" placeholder = {this.props.faq_content}> </Input>
                            <select name="fk_cd" style = {{height: "30px", width: "100px"}}>
                                <option value = "1">매칭서비스</option >
                                <option value = "2">이용문의</option >
                                <option value = "3">결제관련</option >
                            </select>
                            <input class="btn btn2" type="submit" value="변경" color="secondary"/> 
                        </form>
                    </TableCell>
                    <TableCell> <input class="btn btn2" type = "button" value = "취소" color="secondary" onClick = {this.backlist}/> </TableCell>
                </TableRow>
            </TableBody>
        );
    }


}

export default FaqList;