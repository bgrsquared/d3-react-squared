import React, {Component, PropTypes} from 'react';

export default class PlainComponent extends Component {
  highlightID0() {
    const {setEvent} = this.props;
    const eventObj = {
      data: {id: 0},
      event: 'mouseover',
      eventGroup: ['default'],
    };
    setEvent(eventObj);
  }

  mouseout() {
    const {setEvent} = this.props;
    const eventObj = {
      data: {},
      event: 'mouseout',
      eventGroup: ['default'],
    };
    setEvent(eventObj);
  }

  render() {
    const {eventData, passThruProp} = this.props;

    // date... (momentjs would be easier...)
    const ts = eventData.timeStamp;
    let eventId = '';
    let eventType = '';
    let eventGroup = '';
    let formattedTime = 'no event recorded, yet... (try mouseover in charts)';
    if (ts) {
      const date = new Date(ts);
      const hours = date.getHours();
      const minutes = '0' + date.getMinutes();
      const seconds = '0' + date.getSeconds();
      formattedTime = hours + ':' + minutes.substr(-2) + ':' +
        seconds.substr(-2);
      eventId = ' on data id ' + eventData.data.id;
      eventType = ' (' + eventData.event + ')';
      eventGroup = ' on group ' + eventData.eventGroup.join(', ');
    }

    const content = (
      <div>
        <hr/>
        Here, we have a plain component <strong>wrapped</strong> in a HOC
        (<a
        href={'https://medium.com/' +
        '@dan_abramov/' +
        'mixins-are-dead-long-live-higher-' +
        'order-components-94a0d2f9e750'}
        target={'_blank'}>
        high-order component</a>),
        to have access to the chart events! (from anywhere in our app)
        <br/><br/>
        We can <strong>read</strong> from event system:
        Last event {eventType} at:{' '}
        <strong>{formattedTime}</strong>
        {eventId}{eventGroup}
        <br/><br/>
        Or <strong>initiate</strong> events:
        <button
          onClick={this.highlightID0.bind(this)}>
          Simulate mouseover @ id 0 (default group)
        </button>
        <button
          onClick={this.mouseout.bind(this)}>
          Simulate mouseout (default group)
        </button>
        <br/>
        <br/>
        Remember: you can define all sorts of fancy events in the charts
        (onEvent method on chart object).
        In our examples, we just defined mouseover/mouseout on id.
        <br/>
        We might add some fancy stuff later, to give a better idea.
        <br/>
        <br/>
        Oh: and you can pass props through the wrapper, as you might expect:
        Example: <strong>{passThruProp}</strong> (see source code
        for the origin of this;
        spoiler: outside the wrapper)
        <hr/>
      </div>);
    return (<div>
      {content}
    </div>);
  }
}

PlainComponent.propTypes = {
  eventData: PropTypes.object,
  passThruProp: PropTypes.string,
  setEvent: PropTypes.func.isRequired,
};
