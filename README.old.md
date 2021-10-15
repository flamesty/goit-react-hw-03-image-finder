react-35-module-3
ProductList.js
создаем компонент ProductList ({produsts, onDeleteProduct}) принимаем массив и в переборе создаем элементы продуктов
импортируем компонент RemoveItem и используем в качестве кнопки, которая принимает проп onDeleteProduct и id продукта, и передает их ребенку GadgetWindow для кнопки виджета Delete;
App.js
создаем публичный метод удаления продукта;
deleteProduct = id =>
this.setState(prev => ({
allProducts: prev.allProducts.filter(prod => prod.id !== id),
}));
импортируем и рендерим компонент ProductList, передаем ему список продуктов и метод удаления продукта через пропсы;
RemoveItem.js
в компоненте DeleteButton создаем публичный метод handleDelete, в котором вызываем полученный через пропс onDelete и передаем ему полученный id продукта;
в рендер GadgetWindow деструктуризируем и передаем метод handleDelete;
WindowElem.js
в компоненте GadgetWindow получаем handleDelete через пропс и отдаем в onClick для deleteBtn
Modal.js
создаем классовый компонент модального окна:
в index.html добавим портал для модалки
<div id="modal-root"></div>
в App.js добавляем свойство стейта для контроля модального окна - showModal и публичный метод открытия/закрытия модального окна
toggleModal = () => {
this.setState(({ showModal }) => ({
showModal: !showModal,
}));
};
рендерим модальное окно

импортируем import { createPortal } from 'react-dom'
создаем компонент модального окна с рендером разметки:
return createPortal(
<div className={s.backDrop} onClick={handleClose}>
<div className={s.content}>{children}</div>
</div>,
document.getElementById('modal-root'),
)
прописываем метод закрытия по Escape - handleEscape;
в CDM вешаем слушателя на window по keydown;
в CWU снимаем слушателя на window по keydown;
прописываем метод handleClose для onClick в div className="backdrop"
import { Component } from 'react';
import { createPortal } from 'react-dom';
import './Modal.module.scss';

export class Modal extends Component {
componentDidMount() {
window.addEventListener('keydown', this.handleEscape);
}

componentWillUnmount() {
window.removeEventListener('keydown', this.handleEscape);
}

handleEscape = e => {
if (e.code === 'Escape') {
this.props.onClose();
}
};

handleClose = e => {
if (e.currentTarget === e.target) {
this.props.onClose();
}
};

render() {
return createPortal(
<div className="backdrop" onClick={this.handleClose}>
<div className="content">{this.props.children}</div>
</div>,
document.querySelector('#modal-root'),
);
}
}
