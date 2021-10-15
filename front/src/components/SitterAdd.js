import {TableHead, TableBody, Input, TableCell, TableRow,Table } from '@material-ui/core';
import React, {Component} from 'react';
import '../css/default.css';

class SitterAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {value : ''}
    }

    render() {
        return(
            <form action='/admin/sitteradd' method="POST">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>펫 종류</TableCell>
                            <TableCell>세부분류</TableCell>
                            <TableCell>요금</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Input type="text" name="pk_kind" placeholder="펫 종류를 입력하세요." />
                            </TableCell>
                            <TableCell>
                                <Input type="text" name="pk_detail" placeholder="세부분류를 입력하세요."  />
                            </TableCell>
                            <TableCell>
                                <Input type="number" name="sf_fee" min = "10000" placeholder="요금을 입력하세요." />
                            </TableCell>
                            <TableCell>
                                {/* Input : @material-ui/core에서 제공하는 input box로 라인형태로 제공
                                    input :  */}
                                <input class="btn" type="submit" value="요금등록" color="secondary" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </form>
        );
    }
}

export default SitterAdd;