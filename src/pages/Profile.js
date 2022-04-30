import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';
import HeaderNoSearch from '../components/HeaderNoSearch';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      titleProfile: '',
    };
  }

  componentDidMount() {
    this.handlePageName();
  }

  handlePageName = () => {
    const { match } = this.props;

    let titleName;

    if (match.path === '/profile') {
      titleName = 'Profile';
      this.setState({
        titleProfile: titleName,
      });
    }
  };

  render() {
    const { titleProfile } = this.state;
    const { emailInput } = this.context;
    return (
      <>
        <HeaderNoSearch titlePage={ titleProfile } />
        <main>
          <div className="boxProfile">
            <p data-testid="profile-email">{emailInput}</p>
            <br />
            <Link to="/done-recipes">
              <button type="button" data-testid="profile-done-btn">
                Done Recipes
              </button>
            </Link>
            <br />
            <button type="button" data-testid="profile-favorite-btn">
              Favorite Recipes
            </button>
            <br />
            <button type="button" data-testid="profile-logout-btn">
              Logout
            </button>
          </div>
        </main>
      </>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Profile.contextType = MyContext;

export default Profile;
