import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import Settle from './Settle.js';
import Subscriber from './Subscriber.js';
import Header from './Header.js';
import { Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import MemberList from "./MemberList";
import { TableBody } from "@mui/material";




class MainList extends Component {
    // callApi : fetch를 통해 select => response => componentDidMount() res => setState(board) => state.board가 수정
    state = {
        pays: '',
        sub: '',
        mem: '',
        sit: ''
    }

    
     // 생명주기
    /*       
        componentDidAmont() 메서드 : 컴포넌트가 마운트 된 직후 호출되며, 데이터로딩과 같은 작업 등에 재정의
        예 ) List에 특정 item들을 출력하고자 할때 item에 들어갈 Data가 Server에 존재한다면 Server에서 읽어와서
        item 데이터가 state에 존재시 이 state에 데이터를 setting하는 작업
        마운트 즉 React 컴포넌트가 실제 DOM에 삽입된 후 서버로부터 데이터를 읽어와서 setState후 화면에 rerendering
    */
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({pays: res}))
            .catch(err => console.log(err));
            console.log("this.state.pays ==> " + this.state.pays);
        this.callApi2()
            .then(res => this.setState({sub: res}))
            .catch(err => console.log(err));
        this.callApi3()
            .then(res => this.setState({mem: res}))
            .catch(err => console.log(err));
            console.log("this.state2.mem ==>" + this.state.mem);
    }

    /*
        async/await는 Promise를 더욱 쉽게 사용할 수 있도록 해주는 ESB(ES2017) 문법이다.
        이 문법을 사용하기 위해서 함수의 앞부분에 async 키워드를 추가하고,
        해당 함수 내부에서 Promise의 앞 부분에 await 키워드를 사용한다.
    */

    callApi = async() => {
        const response = await fetch('/admin/settle'); // await fech('/url)로 가져온 리스트(boardList)를 받아와서 response에 담는다.
        const body = await response.json();
        console.log("body ==> " + body);
        return body;
    }

    callApi2 = async() => {
        const response = await fetch('/admin/subscriber'); // await fech('/url)로 가져온 리스트(boardList)를 받아와서 response에 담는다.
        const body = await response.json();
        console.log("body ==> " + body);
        return body;
    }

    callApi3 = async() => {
        const response = await fetch('/admin/member'); // await fech('/url)로 가져온 리스트(boardList)를 받아와서 response에 담는다.
        const body = await response.json();
        console.log("body ==> " + body);
        return body;
    }


    render() {

        const list = this.state.pays;
        const list2 = this.state.sub;

        return(
            <Router>
            <div>
                {/* <AppBar position="static">
                    <div><Header/></div>
                </AppBar>
                <br/> */}

                {/* setState()에 의해 board 변수의 값이 select한 결과로 변경 후, BoardList에 props 형태로 board tbl 테이블의 게시판정보 데이터 전달 */}
                {/* props로 전달할 값들은 반드시 대문자 컬럼 */}
               {/*  {
                    this.state.pays ? this.state.pays.map((b, index) => {
                        return <BoardList key = {index}
                                                paykind={b.PAYKIND}
                                                price={b.PRICE}
                                                fee={b.FEE} />
                    }) : ''
                } */}
                <Header/> 
                <div className = "home" align="center">
                    <div className ="charts">
                        <div className="chart1">
                            <div className = "top_div1" align="center" style={{fontSize: '22px', marginBottom:'0px'}}>매출/수익</div>
                            <Settle list = {list}/>
                        </div>

                        <div  className="chart2">
                            <div className = "top_div2" align="center" style={{fontSize: '22px', marginBottom:'0px'}}>구독자 현황</div>
                            <Subscriber list = {list2}/>
                        </div>
                    </div>

                    <div className = "mem_div">
                        <div className = "top_div3" align="center" style={{fontSize: '24px', marginBottom:'0px'}}>신규 회원</div>
                        <Table className = "mem_tb ">
                            <TableHead>
                                <TableRow>
                                    <TableCell>번호</TableCell>
                                    <TableCell>아이디</TableCell>
                                    <TableCell>이름</TableCell>
                                    <TableCell>등급</TableCell>
                                    <TableCell>가입일</TableCell>
                                </TableRow>
                            </TableHead>
                        
                            <TableBody>
                                {
                                    this.state.mem ? this.state.mem.map((b, index) => {
                                        return <MemberList key={index}
                                                            cust_id={b.CUST_ID}
                                                            cust_nm={b.CUST_NM}
                                                            cust_dt={b.CUST_DT}
                                                            rnum={b.RNUM}
                                                            author={b.AUTHOR} 
                                                            />
                                    })  : ''
                                }
                            </TableBody> 
                        </Table>
                    </div>
                </div>
            </div>
            </Router>
        );
    }
}

export default MainList;