import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {listData_1} from '../../fakedata/ListDocRecibidos';
import omit from 'lodash/omit';

function appendZero(n){
  if(n <= 9){
    return "0" + n;
  }
  return n
}


export function exportPDF() {
  let doc = new jsPDF('p', 'px');
  let title = 'UNMSM - SISTEMA DE TRAMITE DOCUMENTARIO OGPL';
  let user = 'Usuario: CHUCHON OCHOA, ANA';//llega por parametro
  let typeDocument = 'REPORTE DE DOCUMENTOS DERIVADOS A OFICINAS INTERNAS';//tipo de documento, viene de constants

  doc.setProperties({
    title: 'ANOTHER TITLE'
  });

  doc.setFont('Courier', 'bold');
  doc.setFontSize(11);
  doc.text(title, 21, 40);

  doc.setFont('Courier', 'normal');
  doc.setFontSize(7);
  doc.text('Fec. Impresion:', 310, 40);

  let date = new Date()
  let date_format = `${appendZero(date.getDate())}/${appendZero(date.getMonth() + 1)}/${date.getFullYear()} ${appendZero(date.getHours())}:${date.getMinutes()}:${date.getSeconds()}`
  doc.setFont('Courier', 'normal');
  doc.setFontSize(7);
  doc.text(date_format, 360, 40);

  doc.setFont('Courier', 'normal');
  doc.setFontSize(7);
  doc.text(user, 332, 50);

  doc.setFont('Courier', 'bold');
  doc.setFontSize(12);
  doc.text(typeDocument, 80, 70);

  let tableDocuments = listData_1.map((data) => {
    return omit(data, ['id', 'movimiento', 'destino', 'indic', 'estado', 'check'])
  });

  let headers = [
    {header: 'Documento', dataKey: 'num_tram'},
    {header: 'Fecha', dataKey: 'fech_envio'},
    {header: 'TIPO DOC.', dataKey: 'docum_nomb'},
    {header: 'ASUNTO', dataKey: 'observacion'},
    {header: 'FIRMA DE CONFORMIDAD', dataKey: 'conformidad'}
  ];


  doc.autoTable({

    columns: headers,
    body: tableDocuments,
    bodyStyles: {minCellWidth: 100, fontSize: 8, rowHeight: '25', fontWeight: 'bold'},
    columnStyles: {
      'num_tram': {halign: 'center', valign: 'middle', columnWidth: 65},
      'fech_envio': {halign: 'center', columnWidth: 40},
      'docum_nomb': {halign: 'center', valign: 'middle', columnWidth: 50},
      'observacion': {halign: 'left', columnWidth: 120},
    },
    headStyles: {halign: 'center', fillColor: '#222', fontSize: 8, textColor: '#FFF'},
    margin: {top: 100, right: 50, bottom: 0, left: 20},
    theme: 'grid',
    tableWidth: 400,

  });

  let blob = doc.output("blob");
  window.open(URL.createObjectURL(blob));
}