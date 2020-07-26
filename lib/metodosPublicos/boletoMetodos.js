const fs = require('fs');
const Boleto = require('../utils/functions/boletoUtils');
const BoletoStringify = require('../stringify/boletoStringify');

module.exports = class Boletos {
  constructor({ banco, pagador, boleto, beneficiario, instrucoes }) {
    this.banco = banco;
    this.pagador = pagador;
    this.boleto = boleto;
    this.beneficiario = beneficiario;
    this.instrucoes = instrucoes;
    this.boletoInfo;

  }

  gerarBoleto() {
    const dataInstance = Boleto.Datas;
    const { datas, valor, valorDeducoes, valorDescontos, valorMulta, valorAcrescimos, especieDocumento, numeroDocumento } = this.boleto;

    this.boletoInfo = Boleto.Boleto.novoBoleto()
      .comDatas(dataInstance.novasDatas()
      .comVencimento(datas.vencimento)
      .comProcessamento(datas.processamento)
      .comDocumento(datas.documentos))
      .comBeneficiario(BoletoStringify.createBeneficiario(this.beneficiario))
      .comPagador(BoletoStringify.createPagador(this.pagador))
      .comBanco(this.banco)
      .comValorBoleto(parseFloat(valor).toFixed(2))
      .comValorDescontos(parseFloat(valorDescontos).toFixed(2))
      .comValorDeducoes(parseFloat(valorDeducoes).toFixed(2)) 
      .comValorMulta(parseFloat(valorMulta).toFixed(2))
      .comValorAcrescimos(parseFloat(valorAcrescimos).toFixed(2))
      .comNumeroDoDocumento(numeroDocumento)
      .comEspecieDocumento(especieDocumento)
      .comInstrucoes(BoletoStringify.createInstrucoes(this.instrucoes));
    
      console.log(this.boletoInfo);

  }

  pdfFile() {
    const dir = './tmp/boletos';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    const stream = fs.createWriteStream(`${dir}/${this.boleto.fileName}`);

    return new Promise((resolve) => new Boleto.Gerador(this.boletoInfo).gerarPDF({
      creditos: '',
      stream,
    }).then(() => resolve({ boleto: this.boleto, stream })));
  }

  pdfStream(stream) {
    return new Promise((resolve) => new Boleto.Gerador(this.boletoInfo).gerarPDF({
      creditos: '',
      stream,
    }).then(() => resolve({ boleto: this.boleto, stream })));
  }
};