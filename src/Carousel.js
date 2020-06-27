import React from "react";

class Carousel extends React.Component {
  state = {
    photos: [],
    active: 0,
  };

  handleIndexClick = (e) => {
    this.setState({
      active: +e.target.dataset.index,
    });
  };

  //   special react method which must be react , which should be static takes set of props and returns to state
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];
    if (media.length) {
      photos = media.map(({ large }) => large);
    }
    console.log(photos);
    return { photos }; //here we return the object which we want to merge with state
  }

  //other thing was to use this.props.media in the render method
  //this.props.media - > photo.large

  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="aninal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => {
            return (
              <img
                key={photo}
                onClick={this.handleIndexClick}
                data-index={index}
                src={photo}
                className={index === active ? "active" : ""}
                alt="animal-thumbnail"
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
