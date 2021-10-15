import React, { Component } from "react";
import Chart from "react-google-charts";

class Subscriber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value : '',
            show_update: "block",
            show_delete: "none",
        }
    }


    // Input : @material-ui/core에서 제공하는 input box로 라인형태로 제공
    // Input : html 태그
    render() {

      let datas = [
          ["name", "value"],
      ];

      for (let i = 0; i < this.props.list.length; i++) {
        var names = '';
        names = this.props.list[i].AUTHOR;
        
        if(names === "ROLE_PREE") names = "프리 사용자";
        else if(names === "ROLE_BUSINESS") names = "비지니스 사용자";
        else if(names === "ROLE_PRIMIUM") names = "프리미엄 사용자";
        
        var price = 0;
        price = this.props.list[i].PERSONNEL;

        datas.push([names, price],);
        console.log("data : " + datas);
      } 

        return(
            <div>
            <Chart
                width={'700px'}
                height={'500px'}
                chartType="PieChart"
                loader={<div>Loading Chart</div>}
                data={datas}
                options={{
                // Just add this option
                pieHole: 0.4,
                is3D: true,
                backgroundColor:'transparent',
                animation: {
                    duration: 3000,
                    easing: 'in',
                    startup: true
                    },
                }}
                rootProps={{ 'data-testid': '3' }}
            />
            </div>
        );
    }


}

export default Subscriber;