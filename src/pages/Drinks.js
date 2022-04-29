import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Footer from '../components/Footer';

class Drinks extends React.Component {
  constructor() {
    super();
    this.state = {
      titleDrinks: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/drinks') {
      titleName = 'Drinks';
      this.setState({
        titleDrinks: titleName,
      });
    }
  };

  render() {
    const { titleDrinks } = this.state;
    return (
      <>
        <Header titlePage={ titleDrinks } />
        <Footer />
      </>
    );
  }
}

Drinks.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Drinks.contextType = MyContext;

export default Drinks;
