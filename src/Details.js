import React from "react";
import Pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";
import { navigate } from "@reach/router";
import Modal from "./Modal";

// <pre>
// <code>{JSON.stringify(props, null, 4)}</code>
// </pre>

class Details extends React.Component {
  state = {
    loading: true,
    showModal: false,
  };

  componentDidMount() {
    Pet.animal(this.props.id).then(({ animal }) => {
      //Adding data which we recive from the API to state
      this.setState({
        url: animal.url, //to navigate when you click adopt dog
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city},${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
    }, console.error);
  }

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  adoptMe = () => navigate(this.state.url); //we can also redirect , no advantages though

  render() {
    if (this.state.loading) {
      return <h1>Loading</h1>;
    }
    const {
      name,
      animal,
      location,
      description,
      media,
      breed,
      loading,
      showModal,
    } = this.state;
    // in line 54 55 56 Added a ThemeHook which . With class we cant use Hooks so , by the help of .consumer we can implement the functionality.
    //remember the Theme useContext is like useState , which return an Array
    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>
            {animal}-{breed}-{location}
          </h2>
          <ThemeContext.Consumer>
            {([theme]) => (
              <button style={{ background: theme }} onClick={this.toggleModal}>
                Adopt {name}
              </button>
            )}
          </ThemeContext.Consumer>
          <p>{description}</p>
          {showModal ? (
            <Modal>
              <div>
                <h1>Would Like to Adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={this.adoptMe}>Yes</button>
                  <button onClick={this.toggleModal}>No, I'm a monster</button>
                </div>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

//If we wrap the details in its return then Errorboundary will not be available to below children in dept.
//So while exporting we wrap it
export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
