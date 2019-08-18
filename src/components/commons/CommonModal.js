import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import PropTypes from 'prop-types'

class CommonModal extends Component {

  render(){

    const {message, content, yesFunction, noFunction, showModal, title, toggleClose = true, yesText = 'Sí', noText = 'No'} = this.props
    return(
      <Modal style={{fontSize: 14}} isOpen={showModal}>
        <ModalHeader data-test={'com-modal-title'} toggle={(noFunction) ? noFunction : null }>{title}</ModalHeader>
        <ModalBody>
          {
            (message) ? message : content
          }
        </ModalBody>
        <ModalFooter>
          <Button data-test={'com-modal-yes'} color="primary" onClick={yesFunction}>{yesText}</Button>
          {
            (toggleClose && noFunction) ? <Button data-test={'com-modal-no'} color="secondary" onClick={noFunction}>{noText}</Button> : null
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
  content: PropTypes.object
};
export default CommonModal