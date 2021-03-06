import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from 'prop-types'
import {TYPE_CONTENT_MODAL} from '../../constants/Constants';

const styleDefault = {fontSize: 12}

class CommonModal extends Component {

  render(){

    const {message,styleCustom, typeContent, content, yesFunction, noFunction, showModal, title, toggleClose = true, yesText = 'Sí', noText = 'No'} = this.props
    return(
      <Modal centered
             //style={(typeContent === TYPE_CONTENT_MODAL.TYPE_CIRCULAR)?{fontSize: 12, maxWidth: 1000, width: 800} :{fontSize: 12}}
             style={{...styleDefault,...styleCustom}}
             isOpen={showModal}>
        <ModalHeader  className='common-modal-header' data-test={'com-modal-title'}>{title}</ModalHeader>
        <ModalBody>
          {
            (message) ? message : content
          }
        </ModalBody>
        <ModalFooter style={{height: 45}}>
          <Button data-test={'com-modal-yes'} color="primary" style={{fontSize: 13}} onClick={yesFunction}>{yesText}</Button>
          {
            (toggleClose && noFunction) ? <Button data-test={'com-modal-no'} color="secondary" onClick={noFunction}  style={{fontSize: 13}}>{noText}</Button> : null
          }
        </ModalFooter>
      </Modal>
    )
  }
}
CommonModal.propTypes = {
  message: PropTypes.string,
  yesFunction: PropTypes.func.isRequired,
  noFunction: PropTypes.func,
  showModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  toggleClose: PropTypes.func,
  yesText: PropTypes.string,
  noText: PropTypes.string,
  content: PropTypes.object,
  typeContent: PropTypes.string,
  styleCustom: PropTypes.object
};
export default CommonModal