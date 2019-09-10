import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {listData_1} from '../../fakedata/ListDataDocuments';
import omit from 'lodash/omit';

function appendZero(n){
  if(n <= 9){
    return "0" + n;
  }
  return n
}

(function(API){
  API.myText = function(txt, options, x, y) {
    options = options ||{};
    /* Use the options align property to specify desired text alignment
     * Param x will be ignored if desired text alignment is 'center'.
     * Usage of options can easily extend the function to apply different text
     * styles and sizes
    */
    if( options.align == "center" ){
      //Get current font size
      var fontSize = this.internal.getFontSize();

      //Get page width
      var pageWidth = this.internal.pageSize.width;

      //Get the actual text's width
      /* You multiply the unit width of your string by your font size and divide
       * by the internal scale factor. The division is necessary
       * for the case where you use units other than 'pt' in the constructor
       * of jsPDF.
      */
      let txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

      //Calculate text's x coordinate
      x = ( pageWidth - txtWidth )/2;
    }

    //Draw text at x,y
    this.text(txt,x,y);
  }
})(jsPDF.API);


export function exportPDF() {
  let doc = new jsPDF('p', 'px','a4');
  let title = 'UNMSM - SISTEMA DE TRAMITE DOCUMENTARIO OGPL';
  let user = 'Usuario: CHUCHON OCHOA, ANA';//llega por parametro
  let typeDocument = 'REPORTE DE DOCUMENTOS DERIVADOS A OFICINAS INTERNAS';//tipo de documento, viene de constants
  let subtitle = 'OFICINA INTERNA: OGPL - OFICINA DE RACIONALIZACION';

  doc.setProperties({
    title: 'Documentos Confirmados'
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
  doc.myText(typeDocument,{align: "center"}, 0, 70);

  doc.setFont('Courier', 'bold');
  doc.setFontSize(12);
  doc.myText(subtitle,{align: "center"}, 0, 90)

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
    bodyStyles: {minCellWidth: 100, fontSize: 8, minCellHeight: '25', fontWeight: 'bold'},
    columnStyles: {
      'num_tram': {halign: 'center', valign: 'middle', cellWidth: 65},
      'fech_envio': {halign: 'center', cellWidth: 40},
      'docum_nomb': {halign: 'center', valign: 'middle', cellWidth: 50},
      'observacion': {halign: 'left', cellWidth: 120},
    },
    headStyles: {halign: 'center', fillColor: '#222', fontSize: 8, textColor: '#FFF'},
    margin: {top: 100, right: 50, bottom: 0, left: 20},
    theme: 'grid',
    tableWidth: 400,

  });

  let blob = doc.output("blob");
  window.open(URL.createObjectURL(blob));
}