import React, { Component } from "react";
import {TableRow, TableCell, Input, TableBody} from '@material-ui/core';

class Sitter extends Component {
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

        axios.post('/admin/sitterdel', {
            sf_cd: this.props.sf_cd
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
            <TableBody>
                <TableRow className = "fee_list" style = {{display:this.state.show_ut ? 'inline' : 'none'}}>
                    <TableCell> {this.props.rnum} </TableCell>
                    <TableCell> {this.props.pk_kind} </TableCell>
                    <TableCell> {this.props.pk_detail}</TableCell>
                    <TableCell> {this.props.sf_fee}</TableCell>
                    <TableCell style = {{width:"140px"}}> <input class="btn" type = "button" value = "수정" color="secondary" onClick = {this.updatelist}/> </TableCell>
                    <TableCell> <input class="btn" type = "button" value = "삭제" color="secondary" onClick = {this.deletfee}/> </TableCell>
                </TableRow>
                
                
                <TableRow className = "fee_modi" style = {{display:this.state.show_ut ? 'none' : 'inline'}}> 
                    <TableCell> {this.props.rnum} </TableCell>
                    <TableCell colSpan = "4"> 
                        <form className = "fee_cen" action = "/admin/sittermodi" method = "post"> 
                            <Input type = "text" placeholder = {this.props.pk_kind} id = "kind" name = "pk_kind"/> 
                            <Input type = "text" placeholder = {this.props.pk_detail} id = "detail" name = "pk_detail"/>
                            <Input type = "number" placeholder = {this.props.sf_fee} id = "fee" name = "sf_fee"/> 
                            <Input type = "hidden" name = "sf_cd" value = {this.props.sf_cd}/>
                            <Input type = "hidden" name = "pk_cd" value = {this.props.pk_cd}/>
                            <input class="btn" type = "submit" value = "변경" color="secondary"/> 
                        </form> 
                    </TableCell>
                    <TableCell> <input class="btn" type = "button" value = "취소" color="secondary" onClick = {this.backlist}/> </TableCell>
                </TableRow>
            </TableBody>
        );
    }


}

export default Sitter;