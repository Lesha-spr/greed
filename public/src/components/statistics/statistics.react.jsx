import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Line} from 'react-chartjs';

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

export class StatisticsUnwrapped extends Component {
    render() {
        return <div>
            <h3>Statistics</h3>
            <div className='row'>
                <div className='small-12 medium-6 large-6 column'>
                    <div className='callout'>
                        <h3>Some stats</h3>
                        <Line data={data} options={{responsive: true}}/>
                    </div>
                </div>
                <div className='small-12 medium-6 large-6 column'>
                    <div className='callout'>
                        <h3>Some stats</h3>
                        <Line data={data} options={{responsive: true}}/>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='small-12 medium-6 large-6 column'>
                    <div className='callout'>
                        <h3>Some stats</h3>
                        <Line data={data} options={{responsive: true}}/>
                    </div>
                </div>
                <div className='small-12 medium-6 large-6 column'>
                    <div className='callout'>
                        <h3>Some stats</h3>
                        <Line data={data} options={{responsive: true}}/>
                    </div>
                </div>
            </div>
        </div>;
    }
}

StatisticsUnwrapped.propTypes = {};

export const Statistics = StatisticsUnwrapped;