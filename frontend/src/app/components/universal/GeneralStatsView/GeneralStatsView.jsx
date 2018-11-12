import React from 'react'
import './GeneralStatsView.css'

import RadarAnimation from 'animations/Radar.js'

const SPEED_FACTOR = 0.001;
const COUNTER_SAVED_MONEY = 3510621;
const COUNTER_EFF = 98;

class GeneralStatsView extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          moneyCount: 0,
          maxMoneyCount: COUNTER_SAVED_MONEY,
          effCount: 0,
          maxEffCount: COUNTER_EFF,
      };
      this.timer = null;
      
      this.tick = this.tick.bind(this);
      this.tickValue = this.tickValue.bind(this);
  }
  
  tickValue(countVarName, maxCountVarName) {
      const shift = Math.max(1, parseInt((this.state[maxCountVarName] - this.state[countVarName])*SPEED_FACTOR));
      if(shift < this.state[maxCountVarName]/100 || this.state[countVarName] >= this.state[maxCountVarName]) {
          this.setState({
              [countVarName]: this.state[maxCountVarName]
          });
      } else {
          this.setState({
              [countVarName]: this.state[countVarName] + shift
          });
      }
  }
  
  tick() {
      this.tickValue('moneyCount', 'maxMoneyCount');
      this.tickValue('effCount', 'maxEffCount');
  }
  
  render() {
    if(this.timer == null) {
        this.timer = setInterval(this.tick, 10);
    }
      
    return (
       <div styleName='GeneralStatsView'>
          <div styleName="Animation">
            <RadarAnimation loop/>
          </div>
          <div styleName="Caption">
            Saved money: {this.state.moneyCount}$
            <br />
            Efficiency: {this.state.effCount}%
          </div>
       </div>
    );
  }
}

export default GeneralStatsView;
