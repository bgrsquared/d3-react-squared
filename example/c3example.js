import React, {Component} from 'react';
import d3 from 'd3';
import DR2 from '../apps/main';

export default class C3Example extends Component {
  constructor() {
    super();
    this.state = {
      c3obj1: false,
      c3obj2: false,
    };
  }

  myRand() {
    return Math.floor(100 * Math.random());
  }

  myRandVector(id) {
    const vect = Array.from({length: 6}, () => this.myRand());
    vect.unshift('data' + id);
    return vect;
  }

  fakeC3LineData() {
    const data = [];
    for (let i = 0; i < 3; i++) {
      data.push(this.myRandVector(i + 1));
    }
    return data;
  }

  dr2legend() {
    return {
      item: {
        onmouseover: (id) => {
          const eventObj = {
            data: {id},
            event: 'mouseover',
            eventGroup: this.api.highlightEmit,
          };
          this.api.setEvent(eventObj);
        },
        onmouseout: (id) => {
          const eventObj = {
            data: {id},
            event: 'mouseout',
            eventGroup: this.api.highlightEmit,
          };
          this.api.setEvent(eventObj);
        },
      },
    };
  }

  c3chart1gen() {
    this.fakeC3LineData();
    return {
      c3arg: {
        bindto: '#chart1',
        color: {pattern: d3.scale.category10().range()},
        data: {
          columns: this.fakeC3LineData(),
          groups: [['data1', 'data2', 'data3']],
          type: 'area',
        },
        legend: this.dr2legend(),
      },
      c3fct: 'generate',
    };
  }

  c3chart2gen() {
    return {
      c3arg: {
        bindto: '#chart2',
        data: {
          columns: this.fakeC3LineData(),
          type: 'spline',
        },
        legend: this.dr2legend(),
      },
      c3fct: 'generate',
    };
  }

  randomType(obj) {
    const rand = Math.random();
    let type;
    if (rand < 1 / 5) {
      type = 'bar';
    } else if (rand < 2 / 5) {
      type = 'area';
    } else if (rand < 3 / 5) {
      type = 'spline';
    } else if (rand < 4 / 5) {
      type = 'pie';
    } else {
      type = 'area-spline';
    }
    const c3obj = {
      c3arg: {
        columns: this.fakeC3LineData(),
        type,
      },
      c3fct: 'load',
    };
    this.setState({[obj]: c3obj});
  }

  newData(obj) {
    const c3obj = {
      c3arg: {
        columns: this.fakeC3LineData(),
      },
      c3fct: 'load',
    };
    this.setState({[obj]: c3obj});
  }

  focusData(id, obj) {
    const c3obj = {c3arg: id, c3fct: 'focus'};
    this.setState({[obj]: c3obj});
  }

  revert(id, obj) {
    const c3obj = {c3arg: id, c3fct: 'revert'};
    this.setState({[obj]: c3obj});
  }

  groupLines(obj) {
    const c3obj = {
      c3arg: [['data1', 'data2', 'data3']],
      c3fct: 'groups',
    };
    this.setState({[obj]: c3obj});
  }

  ungroupLines(obj) {
    const c3obj = {
      c3arg: [[]],
      c3fct: 'groups',
    };
    this.setState({[obj]: c3obj});
  }

  render() {
    let {c3obj1, c3obj2} = this.state;
    const fakeDataBar = () => {
      return [
        {id: 'data1', value: 1 + Math.floor(10 * Math.random())},
        {id: 'data2', value: 1 + Math.floor(10 * Math.random())},
        {id: 'data3', value: 1 + Math.floor(10 * Math.random())},
      ];
    };

    if (!c3obj1) {
      c3obj1 = this.c3chart1gen();
    }
    if (!c3obj2) {
      c3obj2 = this.c3chart2gen();
    }

    return (
      <div>
        <div style={{display: 'flex'}}>
          <div style={{width: '50%'}}>
            <button onClick={this.newData.bind(this, 'c3obj1')}>
              New Data
            </button>
            <button onClick={this.focusData.bind(this, 'data1', 'c3obj1')}>
              Focus 1
            </button>
            <button onClick={this.revert.bind(this, '', 'c3obj1')}>
              Revert all
            </button>
            <button onClick={this.groupLines.bind(this, 'c3obj1')}>
              Group all
            </button>
            <button onClick={this.ungroupLines.bind(this, 'c3obj1')}>
              Ungroup all
            </button>
            <DR2
              c3obj={c3obj1}
            />
          </div>
          <div style={{width: '50%'}}>
            <button onClick={this.newData.bind(this, 'c3obj2')}>
              New Data
            </button>
            <button onClick={this.focusData.bind(this, 'data1', 'c3obj2')}>
              Focus 1
            </button>
            <button onClick={this.revert.bind(this, '', 'c3obj2')}>
              Revert all
            </button>
            <button onClick={this.groupLines.bind(this, 'c3obj2')}>
              Group all
            </button>
            <button onClick={this.ungroupLines.bind(this, 'c3obj2')}>
              Ungroup all
            </button>
            <button onClick={this.randomType.bind(this, 'c3obj2')}>
              Random Type
            </button>
            <DR2 c3obj={c3obj2}/>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div style={{width: '50%'}}>
            <DR2
              data={fakeDataBar()}
              params={{
              colorType: 'category',
              colorArray: d3.scale.category10().range(),
              }}
            />
          </div>
          <div style={{width: '50%'}}>
            <DR2
              chartType={'pie'}
              data={fakeDataBar()}
              params={{
              colorType: 'category',
              colorArray: d3.scale.category10().range(),
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
