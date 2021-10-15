import React, {Component} from 'react';
import Sitter from './Sitter';
import SitterAdd from './SitterAdd.js';
import { Table, TableCell, TableHead, TableRow, TableBody } from "@material-ui/core";
import {BrowserRouter as Router} from "react-router-dom";
import Header from './Header.js';


class SitterList extends Component {
    // callApi : fetch를 통해 select => response => componentDidMount() res => setState(board) => state.board가 수정
    state = {
        sit: ''
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({sit: res}))
            .catch(err => console.log(err));
            console.log("this.state.sit ==> " + this.state.sit);
    }

    callApi = async() => {
        const response = await fetch('/admin/sitter'); // await fech('/url)로 가져온 리스트(boardList)를 받아와서 response에 담는다.
        const body = await response.json();
        console.log("body ==> " + body);
        return body;
    }

    render() {

        return (
            <Router>
                <div>
                    <Header/>

                    <div className="home">

                        <div className = "sit_list">
                        <div className = "top_div4" align="center" style={{fontSize: '24px', marginBottom:'0px'}}>펫 시터 요금 상태</div>
                        <Table className = "pet_tb ">
                            <TableHead>
                                <TableRow className = "fee_head" style = {{display: "block"}}>
                                    <TableCell>번호</TableCell>
                                    <TableCell>펫 종류</TableCell>
                                    <TableCell>세부 분류</TableCell>
                                    <TableCell>요금</TableCell>
                                    <TableCell style ={{textAlign:"right"}}>관&nbsp;&nbsp;</TableCell>
                                    <TableCell style ={{textAlign:"left"}}>&nbsp;&nbsp;리</TableCell>
                                </TableRow>
                            </TableHead>
                        
                            <TableBody>
                                {
                                    this.state.sit ? this.state.sit.map((b, index) => {
                                        return <Sitter key={index}
                                                            sf_cd={b.SF_CD}
                                                            sf_fee={b.SF_FEE}
                                                            pk_kind={b.PK_KIND}
                                                            rnum={b.RNUM}
                                                            pk_detail={b.PK_DETAIL} 
                                                            pk_cd={b.PK_CD}
                                                            />
                                    })  : ''
                                }
                            </TableBody> 
                        </Table>
                        </div>
                    </div>
                    
                    <div className = "sit_add">
                    <   div className = "top_div5" align="center" style={{fontSize: '24px', marginBottom:'0px'}}>펫 시터 요금 등록</div>
                        <SitterAdd></SitterAdd>
                    </div>

                </div>
            </Router>
        );
    }

}

export default SitterList;