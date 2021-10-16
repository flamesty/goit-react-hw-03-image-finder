import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem';

class ImageGallery extends Component {
  // componentDidUpdate(prevProps, prevState) {
  //   console.log('list Update');
  //   window.scrollTo({
  //     top: document.documentElement.scrollHeight,
  //     behavior: 'smooth',
  //   });
  // }
  render() {
    return (
      <ul className="ImageGallery">
        {this.props.images.map((image, index) => {
          return (
            <ImageGalleryItem
              key={image.id}
              webformatURL={image.webformatURL}
              showImageHandle={this.props.showImageHandler(image.largeImageURL)}
              index={index}
            />
          );
        })}
      </ul>
    );
  }
}

export default ImageGallery;
