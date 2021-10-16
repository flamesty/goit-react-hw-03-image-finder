import { Component } from 'react';
import './styles.css';

import fetchImages from './services/apiService';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Loader from './components/Loader/Loader';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    isLoading: false,
    openModal: false,
    error: '',
  };

  maxPages = 0;
  fullImageURL = '';
  newElementHight = 0;

  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.searchQuery !== this.state.searchQuery && this.state.searchQuery !== '') ||
      prevState.page !== this.state.page
    ) {
      this.searchImagesHandler();
      // this.scrollToHandler();
    }
    if (prevState.images.length !== this.state.images.length && prevState.images.length !== 0) {
      // console.log('scrollToHandler App DidUpdate');
      this.scrollToHandler();
    }
  }

  closeModal = () => {
    this.fullImageURL = '';
    this.setState({ openModal: false });
  };

  showImageHandler = (imageUrl) => () => {
    this.fullImageURL = imageUrl;
    this.setState({ openModal: true });
  };

  scrollToHandler = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }, 750);
  };

  searchImagesHandler = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true, error: '' });
    try {
      const result = await fetchImages(searchQuery, page);

      if (result.total !== 0) {
        this.maxPages = Math.ceil(result.totalHits / 12);

        this.setState(({ images }) => ({
          images: [...images, ...result.hits],
        }));
      } else {
        // console.log('Not found');
        this.setState(() => ({
          images: [],
          error: 'No results were found for your search.',
        }));
      }
    } catch (error) {
      console.error(error);
      this.setState(() => ({ error: error.toString() }));
    } finally {
      this.setState({ isLoading: false });

      // this.scrollToHandler();
    }
  };

  loadMoreHandler = () => {
    this.setState(() => ({ page: Math.min(this.maxPages, this.state.page + 1) }));
  };

  onSubmitHandler = (searchString) => {
    this.maxPages = 0;

    this.setState(() => ({
      images: [],
      searchQuery: searchString,
      page: 1,
    }));
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.onSubmitHandler} />
        {this.state.error ? (
          <p className="ErrorText">{this.state.error}</p>
        ) : (
          <ImageGallery
            images={this.state.images}
            showImageHandler={this.showImageHandler}
            scrollToHandler={this.scrollToHandler}
          />
        )}
        
        {this.state.isLoading && <Loader />}
        {this.state.page < this.maxPages && <Button loadMoreHandler={this.loadMoreHandler} />}
        {this.state.openModal && (
          <Modal fullImageURL={this.fullImageURL} onClose={this.closeModal}></Modal>
        )}
      </div>
    );
  }
}

export default App;