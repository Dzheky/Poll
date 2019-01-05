import React, {Component} from 'react';
import styles from './ChartLabel.module.css';

class ChartLabel extends Component {
  container;

  componentDidUpdate() {
    const {value, total, showChart, background} = this.props;
    if (showChart) {
      const percent = Math.floor(value / total * 100);
      this.container.style.transition = 'width 300ms';
      this.container.style.width = `${percent}%`;
      this.container.style.backgroundColor = background;
    } else {
      this.container.style.transition = '';
      this.container.style.width = `0`;
      this.container.style.backgroundColor = 'transparent';
    }
  }

  setContainer = (ref) => {
    this.container = ref;
  };

  render() {
    const {value, total, showChart} = this.props;
    const percent = Math.round(value / total * 100);

    return (
        <div
            className={styles.container}
            ref={this.setContainer}
        >
          {this.props.children}
          {showChart && <span>{` - ${value}`}</span>}
          {showChart && <span>{` (${percent}%)`}</span>}
        </div>
    );
  }
}

export default ChartLabel;