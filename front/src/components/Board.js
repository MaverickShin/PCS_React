import { Table, TableCell, TableHead, TableRow } from "@material-ui/core";
import { Component } from "react";
import Header from "./Header";
import {BrowserRouter as Router} from "react-router-dom";
import QnaList from "./QnaList";
import FaqList from "./FaqList";
import FaqAdd from "./FaqAdd";

class Member extends Component {

    state = {
        qna: '',
        faq: ''
    }

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({qna: res}))
            .catch(err => console.log(err));
            console.log("this.state2.qna ==>" + this.state.qna);
        this.callApi2()
            .then(res => this.setState({faq: res}))
            .catch(err => console.log(err));
            console.log("this.state2.faq ==>" + this.state.faq);
    }

    callApi = async() => {
        const response = await fetch('/admin/qnalist');  // await fetch('/url')로 json 형식으로 가져온 리스트(boardList)를 받아와서 response에 담는다.
        const body = await response.json();
        console.log("body ==> " + body);
        return body;
    }

    callApi2 = async() => {
        const response = await fetch('/admin/faqlist');  // await fetch('/url')로 json 형식으로 가져온 리스트(boardList)를 받아와서 response에 담는다.
        const body = await response.json();
        console.log("faq ==> " + body);
        return body;
    }

    render() {
        return(
            <Router>
                <div>
                    <Header/>

                    <div className = "home" align="center">

                        <div className = "qna_list">
                        <div className = "top_div6" align="center" style={{fontSize: '24px', marginBottom:'0px'}}>QnA 답변 대기</div>
                            
                            <div style = {{height:'60px'}}></div>
                            
                            <Table className = "qna_tb">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>번호</TableCell>
                                        <TableCell>아이디</TableCell>
                                        <TableCell>이름</TableCell>
                                        <TableCell>제목</TableCell>
                                        <TableCell>문의 내용</TableCell>
                                        <TableCell>문의 유형</TableCell>
                                        <TableCell>등록일</TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>

                            {
                                this.state.qna ? this.state.qna.map((b, index) => {
                                    return <QnaList key={index}
                                                        cust_id={b.CUST_ID}
                                                        cust_nm={b.CUST_NM}
                                                        qna_title={b.QNA_TITLE}
                                                        qna_content={b.QNA_CONTENT}
                                                        qna_dt={b.QNA_DT} 
                                                        qna_kind={b.QNA_KIND}
                                                        rnum={b.RNUM}
                                                        qna_cd={b.QNA_CD}
                                                        />
                                })  : ''
                            }

                        </div>

                        <div className = "faq_flex">

                        <div className = "faq_list">
                            <div className = "top_div7" align="center" style={{fontSize: '24px', marginBottom:'0px'}}>FAQ 목록</div>
                            <Table className = "faq_tb ">
                                <TableHead>
                                    <TableRow style = {{display:'block'}} className='faq_head'>
                                        <TableCell className = "sibal">번호</TableCell>
                                        <TableCell>제목</TableCell>
                                        <TableCell>내용</TableCell>
                                        <TableCell>질문 유형</TableCell>
                                        <TableCell style ={{textAlign:"right"}}>관&nbsp;&nbsp;</TableCell>
                                        <TableCell style ={{textAlign:"left"}}>&nbsp;&nbsp;리</TableCell>
                                    </TableRow>
                                </TableHead>
                             
                                    {
                                        this.state.faq ? this.state.faq.map((b, index) => {
                                            return <FaqList key={index}
                                                                faq_title={b.FAQ_TITLE}
                                                                faq_content={b.FAQ_CONTENT}
                                                                faq_kind={b.FAQ_KIND}
                                                                faq_cd={b.FAQ_CD}
                                                                rnum={b.RNUM}
                                                                />
                                        })  : ''
                                    }
                            </Table> 
                        </div>

                        <div className = "faq_add">
                            <div className = "top_div8" align="center" style={{fontSize: '24px', marginBottom:'0px'}}>FAQ 등록</div>
                            <FaqAdd></FaqAdd>
                        </div>

                        </div>
                    </div>   
                </div>
            </Router>
        );
    }
}

export default Member;