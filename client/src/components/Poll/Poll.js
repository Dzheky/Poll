import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selectEvents} from '../../selectors/pollSelectors';
import {ArrayOfCounts, CHART_BACKGROUNDS, shuffle, sportsImages} from './PollModel';
import styles from './Poll.module.css';
import {getFlagUrlByCountryName} from '../../api/countries';
import {fetchSportEventsAction, voteForSportEventAction} from '../../actions/pollActions';
import Spinner from '../Spinner/Spinner';
import RadioButton from '../RadioButton/RadioButton';
import ChartLabel from '../ChartLabel/ChartLabel';

class Poll extends Component {
  state = {
    currentEventIndex: null,
    eventIndexes: [],
    voted: false,
    message: '',
    loading: false,
    countryFlag: {
      country: '',
      url: '',
    },
    checkedOption: '',
  };

  componentDidUpdate() {
    const {events} = this.props;
    const {currentEventIndex, countryFlag} = this.state;
    const currentEvent = events[currentEventIndex];

    if (currentEvent && currentEvent.country !== countryFlag.country) {
      this.fetchFlagUrl(currentEvent.country);
    }
  }

  static getDerivedStateFromProps(nextProps, currState) {
    if (currState.currentEventIndex === null && nextProps.events.length !== 0) {
      const [currentEventIndex, ...eventIndexes] = shuffle(ArrayOfCounts(nextProps.events.length));

      return {
        eventIndexes,
        currentEventIndex,
      };
    }

    return null;
  }

  fetchFlagUrl = async (country) => {
    const url = await getFlagUrlByCountryName(country);

    this.setState({
      countryFlag: {
        country,
        url,
      },
    });
  };

  handleOptionChange = (e) => {
    this.setState({
      checkedOption: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    const {events} = this.props;
    const {currentEventIndex, checkedOption, eventIndexes} = this.state;
    const currentEvent = events[currentEventIndex];
    const result = await this.props.voteForSportEvent(currentEvent.id, checkedOption);

    if (result) {
      this.setState({
        voted: true,
        message: eventIndexes.length ? '' : `You've voted for all ${currentEvent.sport.toLowerCase().replace('_', ' ')} events`,
        loading: false,
      });
    } else {
      this.setState({
        voted: false,
        message: 'Something was wrong',
        loading: false,
      });
    }
  };

  handleNextEventClick = (e) => {
    e.preventDefault();
    const {eventIndexes} = this.state;
    const {events} = this.props;
    const [currentEventIndex, ...restEventIndexes] = eventIndexes;
    if (currentEventIndex !== undefined) {
      this.setState({
        currentEventIndex,
        eventIndexes: restEventIndexes,
        voted: false,
        checkedOption: '',
      });
      this.fetchFlagUrl(events[currentEventIndex].country);
    }
  };

  renderSubmitButton = () => {
    const {loading, voted, checkedOption, message} = this.state;

    if (loading) {
      return (
          <Spinner className={styles.spinner}/>
      );
    }

    if (message) {
      return (
          <div className={styles.message}>{message}</div>
      );
    }

    if (voted) {
      return (
          <div className={styles.nextEventContainer}>
            Your vote is accepted
            <button
                className={styles.nextEventButton}
                onClick={this.handleNextEventClick}
            >
              Next Event
            </button>
          </div>
      );
    }

    return (
        <input
            className={styles.submitButton}
            disabled={!checkedOption}
            type="submit"
            value="Submit"
        />
    );
  };


  render() {
    const {events} = this.props;
    const {currentEventIndex, countryFlag, checkedOption, voted} = this.state;
    const currentEvent = events[currentEventIndex];

    if (!currentEvent) {
      return null;
    }

    const total = Object.keys(currentEvent.voteOptions).reduce((prevVal, currVal) => {
      return prevVal + currentEvent.voteOptions[currVal].votes;
    }, 0);

    return (
        <section className={styles.container}>
          <div className={styles.poll}>
            <img
                className={styles.sportImage}
                src={sportsImages[currentEvent.sport]}
            />
            <div className={styles.title}>
              {currentEvent.sport.replace('_', ' ')}
              {countryFlag.url && <img src={countryFlag.url} className={styles.flag}/>}
            </div>
            <div className={styles.content}>
              <div className={styles.players}>
                <div className={styles.home}>
                  HOME
                  <div className={styles.player}>{currentEvent.homeName}</div>
                </div>
                <div className={styles.away}>
                  AWAY
                  <div className={styles.player}>{currentEvent.awayName}</div>
                </div>
              </div>
              <form onSubmit={this.handleSubmit} className={styles.inputs}>
                <div className={styles.inputsTitle}>
                  Choose winning team:
                </div>
                <div className={styles.inputGroup}>
                  {Object.keys(currentEvent.voteOptions).map((value, id) => {
                    const option = currentEvent.voteOptions[value];

                    return (
                        <div className={styles.radioButton} key={value}>
                          <RadioButton
                              name="poll"
                              disabled={voted}
                              value={value}
                              checked={checkedOption === value}
                              onChange={this.handleOptionChange}
                              label={
                                <ChartLabel
                                    showChart={!!voted}
                                    value={option.votes}
                                    total={total}
                                    background={CHART_BACKGROUNDS[id]}
                                >
                                  {option.description}
                                </ChartLabel>
                              }
                          />
                        </div>
                    );
                  })}
                </div>
                {this.renderSubmitButton()}
              </form>
            </div>
          </div>
        </section>
    );
  }
}


const mapPropsToState = (state) => ({
  events: selectEvents(state),
});

const mapDispatchToProps = (dispatch) => ({
  voteForSportEvent: (eventId, option) => dispatch(voteForSportEventAction(eventId, option)),
  fetchSportEvents: () => dispatch(fetchSportEventsAction()),
});

export default connect(mapPropsToState, mapDispatchToProps)(Poll);
