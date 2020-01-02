import React, {Component} from 'react';
import {OFFICES} from "../../utils/Constants";
import {
  getOfficeById,
  deleteOffice,
  updateOffice,
  createOffice,
  loadAllOffices
} from "../../actions/actions";
import get from "lodash/get";
import { connect } from 'react-redux';
import map from "lodash/map";
import CommonModal from "../commons/CommonModal";
import CommonIcon, {ICON_TYPE} from "../commons/CommonIcon";
import FormRender from "../../forms/FormRender";
import {formEditOffice} from "../../forms/templates/TemplateManageOffice";

function newOffice(){
  return({
    [OFFICES.STATUS]: true,
    [OFFICES.NOMBRE]: '',
    [OFFICES.TIPO]: '',
    [OFFICES.CODIGO]: '',
    [OFFICES.SIGLAS]: ''
  })
}

class ManageOffice extends Component{

  state = {
    office: null,
    officeName: "",
    showDeleteModal: false
  };

  loadOfficeById(officeId){
    const {getOfficeById} = this.props;
    getOfficeById(officeId).then((response)=>{
      if(response.responseCode === 0){
        const {office} = this.props;
        this.setState({office, officeName: get(office, OFFICES.NOMBRE)})
      }
    })
  }

  async componentDidMount(){
    const {match = {}} = this.props
    const {id} = match.params
    if (id) {
      await this.loadOfficeById(id)
    }else{
      await this.setState({office: newOffice(), officeName: ''})
    }
  }

  onChangeValueMap=(prop,value)=>{
    this.setState({office: {...this.state.office, [prop]: value}})
  };

  goToMaintenance=()=>{
    const {history} = this.props
    history.push('/admin/Maintenance/offices')
  };

  onSaveOffice=()=>{
    const {office} = this.state
    const {updateOffice, createOffice} = this.props
    const {id} = office

    if(id){
      updateOffice(office,this.goToMaintenance)
    }else {
      createOffice(office,this.goToMaintenance)
    }
  };

  onToggleDeleteOffice=()=>{
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onDeleteOffice=()=>{
    const {office} = this.state;
    const {id} = office;
    const {deleteOffice, loadAllOffices} = this.props;
    deleteOffice(id,null).then((response) => {
      if(response.responseCode === 0){
        loadAllOffices().then(()=>{
          this.onToggleDeleteOffice()
          setTimeout(()=>{this.goToMaintenance()}, 2000)
        })
      }
    })
  };

  footerForm = (office) => {
    return(
      [
        {text: 'Grabar', action: this.onSaveOffice},
        {text: (office && office.estado? 'Eliminar':'Activar'), action: this.onToggleDeleteOffice}
      ])
  };

  render(){
    const {office, officeName, showDeleteModal} = this.state
    const buttonsFooter = this.footerForm(office);

    const modalProps = [{
      showModal: showDeleteModal,
      title: (office && office.estado ? 'Eliminar dependencia' : 'Activar dependencia'),
      message: (office && office.estado ? '¿Desea eliminar la dependencia?': '¿Desea reactivar la dependencia?'),
      yesFunction: this.onDeleteOffice,
      yesText: 'Aceptar',
      noFunction: this.onToggleDeleteOffice,
      noText: 'Cancelar'
    }];

    return(
      <div className='container-edit'>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
        <div className='container-title'>
          <div className='title-icon'>
            <CommonIcon type={ICON_TYPE.ARROW} onClick={this.goToMaintenance}/>
          </div>
          <h5>{`Oficina: ${officeName}`}</h5>
        </div>
        <div style={{width: '50%'}}>
          <FormRender
            formTemplate={formEditOffice(!!(office && office.id))}
            valueMap={office}
            onChange={this.onChangeValueMap}/>
          <div style={{marginTop: 20,width: 170, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            {
              buttonsFooter.map((content, index)=>{
                return <button key={'button'+index} className='btn btn-dark' onClick={content.action}>
                  {content.text}
                </button>
              })
            }
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOfficeById: (userId) => dispatch(getOfficeById(userId)),
  deleteOffice: (userId) => dispatch(deleteOffice(userId)),
  updateOffice: (user,cb) => dispatch(updateOffice(user,cb)),
  createOffice: (user,cb) => dispatch(createOffice(user,cb)),
  loadAllOffices: () => dispatch(loadAllOffices())
});

function mapStateToProps(state){
  return{
    office: state.office.office
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageOffice)