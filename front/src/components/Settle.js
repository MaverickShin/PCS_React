import React, { Component } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend,CartesianGrid, Tooltip} from 'recharts';

class Settle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
            show_update: "block",
            show_delete: "none"
        }
    }

    // Input : @material-ui/core에서 제공하는 input box로 라인형태로 제공
    // Input : html 태그
    render() {

      
      let datas = [];

      for (let i = 0; i < this.props.list.length; i++) {
        var name = this.props.list[i].PAYKIND;
        var price = this.props.list[i].PRICE;
        var fee = this.props.list[i].FEE;
        
        datas.push({"name" : name, "매출" : price, "수익" : fee},);
      }

        return(
            <div className = "settle_cht">
                {/* 리스트 결과 */}
                <BarChart width={600} height={400} data={datas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="매출" fill="#455a64" />
                    <Bar dataKey="수익" fill="#8bc34a" />
                </BarChart>
            </div>
        );
    }


}

export default Settle;