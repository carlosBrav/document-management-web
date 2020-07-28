import React, {Component, Fragment} from 'react';
import {getView2ByTramNum} from '../../actions/actions';
import {ClipLoader} from "react-spinners";
import {connect} from 'react-redux';
import CommonTable from '../commons/CommonTable';
import {getStructureSeguimientoView} from '../../components/utils/StructureTables';

class SeguimientoDocument extends Component{

    componentDidMount(){
        const {tramNum} = this.props;
        console.log('TRAM NUM ', tramNum);
        this.getMovements(tramNum);
    }

    getMovements = async (tramNum) =>{
        const {getView2ByTramNum} = this.props;
        await getView2ByTramNum(tramNum);
    }

    render(){
        const {dataView2,dataLocal,isLoadingMovements} = this.props;
        console.log('DATA VIEW ',dataView2);
        console.log('DATA LOCAL ', dataLocal);
        return (
            <div style={{display: "flex", flexDirection: "column"}}>
                {
                    isLoadingMovements ? <div className='spinner-tab'>
                    <ClipLoader
                      size={150} // or 150px
                      color={"#EEE2E0"}
                      loading={isLoadingMovements}
                    />
                  </div> :
                  <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: 400}}>
                    <div style={{display: "flex", flexDirection: "column", height: "45%", overflowX: "scroll", overflowY: "scroll"}}>
                      <h5>Movimientos del sistema de tramite externo</h5>
                      <CommonTable data={dataView2} tableStructure={getStructureSeguimientoView()} />
                    </div>
                    <div style={{display: "flex", flexDirection: "column", height: "45%", overflowX: "scroll", overflowY: "scroll"}}>
                      <h5>Movimientos del sistema de tramite interno</h5>
                      <CommonTable data={dataLocal} tableStructure={getStructureSeguimientoView()} />
                    </div>
                  </div>
                }
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    getView2ByTramNum: (tramNum) => dispatch(getView2ByTramNum(tramNum))
});

const mapStateToProps = (state) => ({
    isLoadingMovements: state.dataView.isLoadingMovements,
    dataView2: state.dataView.dataView2,
    dataLocal: state.dataView.dataLocal
})

export default connect(mapStateToProps, mapDispatchToProps)(SeguimientoDocument)