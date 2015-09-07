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

  render() {
    return (
      <div>
        <button onClick={this.newData.bind(this)}>
          Flip lines
        </button>
        <DR2 c3obj={this.state.c3obj}/>
      </div>
    );
  }
}