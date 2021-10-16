import { Component } from 'react';

class ImageGalleryItem extends Component {
  // componentDidMount(prevProps, prevState) {
  //   console.log(prevProps);
  //   console.log(prevState);
  //   console.log(this.props.index);
  // }

  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          src={this.props.webformatURL}
          alt=""
          className="ImageGalleryItem-image"
          onClick={this.props.showImageHandle}
        />
      </li>
    );
  }
}

export default ImageGalleryItem;
