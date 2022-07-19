import "../Styles/Modal.scss"
import ReactDom from "react-dom";


const Modal = ({deleteModal, closeModal}) => {
    return ReactDom.createPortal(
        <div className="modal__background">
        <div className="modal__container">
          <div className="modal__title">
             <h2>Delete Comment</h2>
          </div>
          <div className="modal__description">
             <p>Are you sure you want to delete this comment? This will remove the comment and can’t be undone.</p>
          </div>
          <div className="modal__footer">
             <button className="modal__footer--cancel" 
              onClick={() => closeModal(false)}>
              No, Cancel
             </button>
             <button className="modal__footer--delete" 
               onClick={deleteModal}>
               Yes, Delete
             </button>
          </div>
        </div>
        
     </div>,
     document.getElementById('portal')
    );
}
 
export default Modal;