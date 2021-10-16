import Spinner from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const Loader = () => {
  return (
    <div className="Loader">
      <Spinner type="Bars" color="#3f51b5" height={60} width={120} />
    </div>
  );
};

export default Loader;
