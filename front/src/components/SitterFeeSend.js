import { Component } from "react";
import {post} from "axios";


class SitterFeeSend extends Component {
    constructor(props) {
        super(props);
        this.state = {value : ''}
    }

    handleFromsub = (e) => {
        e.preventDefault()
        this.addSitterfee()
            .then((response) => {
                console.log(response.data);
            })
    }

    addSitterfee = () => {
        const url = "/admin/sitteradd";
        const formData = new FormData();
        formData.append('pk_kind', this.state.pk_kind);
        formData.append('pk_detail', this.state.pk_detail);
        formData.append('sf_fee', this.state.sf_fee);
    }

    render() {
        return (
            <form onSubmit={this.handleFromsub}>
                <h2>요금 추가</h2>
                펫 종류 : <input type = "text" name = "pk_kind" value = {this.state.pk_kind}></input>
                세부분류 : <input type = "text" name = "pk_detail" value = {this.state.pk_detail}></input>
                요금 : <input type ="nember" name = "sf_fee" min = "10000" value = {this.state.sf_fee}></input>  
                <button type ="submit">추가하기</button>
            </form>
        );
    }
}