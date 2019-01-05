import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './App.module.css'
import Header from '../Header/Header';
import Poll from '../Poll/Poll';
import Footer from '../Footer/Footer';
import {initApplication} from './AppModel';

class App extends Component {
  componentDidMount() {
    this.props.initApplication();
  }

  render() {
    return (
        <div className={styles.container}>
          <Header/>
          <Poll/>
          <Footer/>
        </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  initApplication: () => dispatch(initApplication()),
});

export default connect(null, mapDispatchToProps)(App);
