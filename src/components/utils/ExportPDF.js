import jsPDF from 'jspdf';
import 'jspdf-autotable';
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

export function exportCircularDocuments(documents, userName){

}

export function exportAdvancedSearch(documents, userName){
  let doc = new jsPDF('p', 'px', 'a4');
  let title = 'UNMSM - SISTEMA DE TRAMITE DOCUMENTARIO OGPL';
  let user = `Usuario: ${userName}`;//llega por parametro
  let subtitle = 'REPORTE DE BUSQUEDA AVANZADA';

  doc.setProperties({
    title: 'Reporte de Bsuqeda Avanzada'
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
  doc.text(user, 310, 50);

  doc.setFont('Courier', 'bold');
  doc.setFontSize(12);
  doc.myText(subtitle,{align: "center"}, 0, 85);

  let headers = [
    {header: 'CORRELATIVO', dataKey: 'numTram'},
    {header: 'FECHA ING.', dataKey: 'fechaIngreso'},
    {header: 'FECHA ENV.', dataKey: 'fechaEnvio'},
    {header: 'OBSERVACION', dataKey: 'observacion'},
    {header: 'ORIGEN', dataKey: 'origenNombre'},
    {header: 'DERIVADO A', dataKey: 'destinoNombre'}
  ];

  doc.autoTable({

    columns: headers,
    body: documents,
    bodyStyles: {minCellWidth: 100, fontSize: 6, minCellHeight: 'auto', fontWeight: 'bold'},
    columnStyles: {
      'numTram': {halign: 'center', valign: 'middle', cellWidth: 25},
      'fechaIngreso': {halign: 'center', valign: 'middle', cellWidth: 35},
      'fechaEnvio': {halign: 'center',valign: 'middle', cellWidth: 35},
      'observacion': {halign: 'left',valign: 'middle', cellWidth: 75},
      'origenNombre': {halign: 'left',valign: 'middle', cellWidth: 70},
      'destinoNombre': {halign: 'left',valign: 'middle', cellWidth: 70},
    },
    headStyles: {halign: 'center', fillColor: '#222', fontSize: 6, textColor: '#FFF'},
    margin: {top: 100, right: 50, bottom: 0, left: 10},
    theme: 'grid',
    tableWidth: 430,

  });

  doc.save("BusquedaAvanzada.pdf")

}

export function exportControlDocuments(documents, userName) {
  let doc = new jsPDF('p', 'px', 'a4');
  let title = 'UNMSM - SISTEMA DE TRAMITE DOCUMENTARIO OGPL';
  let user = `Usuario: ${userName}`;//llega por parametro
  let subtitle = 'REPORTE DEL CONTROL DE DOCUMENTOS';

  doc.setProperties({
    title: 'Control de Documentos Internos'
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
  doc.text(user, 310, 50);

  doc.setFont('Courier', 'bold');
  doc.setFontSize(12);
  doc.myText(subtitle,{align: "center"}, 0, 85);

  let headers = [
    {header: 'CORRELATIVO', dataKey: 'numTram'},
    {header: 'DESTINO', dataKey: 'destinoNombre'},
    {header: 'F. ENVIO', dataKey: 'fechaEnvio'},
    {header: 'INDICADOR', dataKey: 'indiNombre'},
    {header: 'OBSERVACION', dataKey: 'observacion'},
    {header: 'DOCUMENTO', dataKey: 'document'},
    {header: 'ESTADO', dataKey: 'status'}
  ];

  doc.autoTable({

    columns: headers,
    body: documents,
    bodyStyles: {minCellWidth: 100, fontSize: 6, minCellHeight: 'auto', fontWeight: 'bold'},
    columnStyles: {
      'numTram': {halign: 'center', valign: 'middle', cellWidth: 45},
      'destinoNombre': {halign: 'center', valign: 'middle', cellWidth: 65},
      'fechaEnvio': {halign: 'center',valign: 'middle', cellWidth: 35},
      'indiNombre': {halign: 'left',valign: 'middle', cellWidth: 40},
      'observacion': {halign: 'left',valign: 'middle', cellWidth: 85},
      'document': {halign: 'left',valign: 'middle', cellWidth: 50},
      'status': {halign: 'left',valign: 'middle', cellWidth: 40},
    },
    headStyles: {halign: 'center', fillColor: '#222', fontSize: 6, textColor: '#FFF'},
    margin: {top: 100, right: 50, bottom: 0, left: 10},
    theme: 'grid',
    tableWidth: 430,

  });

  doc.save("ControlDocumentos.pdf")
}

export function exportProveidosDocuments(documents, userName){

}

export function exportConfirmDocuments(documents, userName) {
  let doc = new jsPDF('p', 'px','a4');
  let title = 'UNMSM - SISTEMA DE TRAMITE DOCUMENTARIO OGPL';
  let user = `Usuario: ${userName}`;//llega por parametro
  let typeDocument = 'REPORTE DE DOCUMENTOS DERIVADOS A OFICINAS INTERNAS';//tipo de documento, viene de constants
  //let subtitle = 'OFICINA INTERNA: OGPL - OFICINA DE RACIONALIZACION';

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
  doc.text(user, 310, 50);

  doc.setFont('Courier', 'bold');
  doc.setFontSize(12);
  doc.myText(typeDocument,{align: "center"}, 0, 85);

  /*doc.setFont('Courier', 'bold');
  doc.setFontSize(12);
  doc.myText(subtitle,{align: "center"}, 0, 90)*/

  let tableDocuments = documents.map((data) => {
    return omit(data, ['moviNum', 'depeCod', 'destCod', 'moviFecIng', 'indiNombre','indiCod','estaNombre','docuNombre','docuNum','docuSiglas','docuAnio'])
  });

  let headers = [
    {header: 'CORRELATIVO', dataKey: 'tramNum'},
    {header: 'FECHA', dataKey: 'moviFecEnv'},
    {header: 'DESTINO', dataKey: 'moviDestino'},
    {header: 'ASUNTO', dataKey: 'moviObs'},
    {header: 'FIRMA', dataKey: 'conformidad'}
  ];


  doc.autoTable({

    columns: headers,
    body: tableDocuments,
    bodyStyles: {minCellWidth: 100, fontSize: 6, minCellHeight: 'auto', fontWeight: 'bold'},
    columnStyles: {
      'tramNum': {halign: 'center', valign: 'middle', cellWidth: 45},
      'moviFecEnv': {halign: 'center', valign: 'middle', cellWidth: 45},
      'moviDestino': {halign: 'center', valign: 'middle', cellWidth: 95},
      'moviObs': {halign: 'left', cellWidth: 130},
      'conformidad': {halign: 'left', cellWidth: 40},
    },
    headStyles: {halign: 'center', fillColor: '#222', fontSize: 6, textColor: '#FFF'},
    margin: {top: 100, right: 50, bottom: 0, left: 10},
    theme: 'grid',
    tableWidth: 430,

  });

  /*let blob = doc.output("blob");
  window.open(URL.createObjectURL(blob));*/
  doc.save("DocumentosInternos.pdf")
}