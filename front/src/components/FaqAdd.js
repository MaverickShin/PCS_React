import { Input, TableCell, TableRow,Table } from '@material-ui/core';
import React, {Component} from 'react';
import '../css/default.css';

class FaqAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {value : '', kind: ''}
    }

    render() {

        return(
            <form action='/admin/faqadd' method="POST">
                <Table>
                    <TableRow>
                        <TableCell className="faa_left">FAQ 유형</TableCell>
                        <TableCell>
                            <select name="fk_cd" style = {{height: "30px", width: "120px"}}>
                                <option value = "1">매칭서비스</option >
                                <option value = "2">이용문의</option >
                                <option value = "3">결제관련</option >
                            </select>
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="faa_left">제목</TableCell>            
                        <TableCell>
                        <Input type="text" name="faq_title" placeholder="제목을 입력하세요."  />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell className="faa_left">내용</TableCell>         
                        <TableCell>
                            <Input type="text" name="faq_content"  placeholder="내용을 입력하세요." />
                        </TableCell>  
                    </TableRow>  

                    <TableRow>
                        <TableCell className="faa_left">등록하기</TableCell>
                        <TableCell>
                            <input class="btn" type="submit" value="FAQ 등록" color="secondary" />
                        </TableCell>
                    </TableRow>        
                </Table>
            </form>
        );
    }
}

export default FaqAdd;