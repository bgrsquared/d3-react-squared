'use strict';

import React, {Component} from 'react';
import c3 from 'c3';
import DR2 from '../apps/main';

export default class C3Example extends Component {
  constructor() {
    super();
    this.state = {
      c3obj: {
        c3arg: {
          bindto: '#hui',
          data: {
            columns: [
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 50, 20, 10, 40, 15, 25],
              ['data3', -50, -20, -10, -40, -15, -25]
            ]
          },
          legend: {
            item: {
              onmouseover: function(id) {
                let eventObj = {
                  data: {id}, event: 'mouseover', eventGroup: ['default']
                };
                this.api.setEvent(eventObj);
              },
              onmouseout: function(id) {
                let eventObj = {
                  data: {id}, event: 'mouseout', eventGroup: ['default']
                };
                this.api.setEvent(eventObj);
              }

            }
          }
        },
        c3fct: 'generate'
      }
    }
  }

  newData() {
    let c3obj = {
      c3arg: {
        columns: [
          ['data1', -30, -200, -100, -400, -150, -250],
          ['data2', -50, -20, -10, -40, -15, -25],
          ['data3', 50, 20, 10, 40, 15, 25]
        ]
      },
      c3fct: 'load'
    };
    this.setState({c3obj});
  }

  focusData(id) {
    let c3obj = {c3arg: id, c3fct: 'focus'};
    this.setState({c3obj});
  }

  revert(id) {
    let c3obj = {c3arg: id, c3fct: 'revert'};
    this.setState({c3obj});
  }

  render() {
    let fakeData = () => {
      return [
        {id: 'data1', value: 1 + Math.floor(10 * Math.random())},
        {id: 'data2', value: 1 + Math.floor(10 * Math.random())},
        {id: 'data3', value: 1 + Math.floor(10 * Math.random())}
      ];
    };

    return (
      <div>
        <button onClick={this.newData.bind(this)}>
          Flip lines
        </button>
        <button onClick={this.focusData.bind(this, 'data1')}>
          Focus 1
        </button>
        <button onClick={this.revert.bind(this, '')}>
          Revert all
        </button>
        <DR2 c3obj={this.state.c3obj}/>
        <div>
          <DR2
            data={fakeData()}
          />
        </div>
      </div>
    );
  }
}