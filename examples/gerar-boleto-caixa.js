const { Bancos, Boletos, streamToPromise } = require('../lib/index');

const boleto = {
  banco: new Bancos.Caixa(),
  pagador: {
    nome: 'José Bonifácio de Andrada',
    RegistroNacional: '12345678',
    endereco: {
      logradouro: 'Rua Pedro Lessa, 15',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estadoUF: 'RJ',
      cep: '20030-030'
    }
  },
  instrucoes: ['Após o vencimento Mora dia R$ 1,59', 'Após o vencimento, multa de 2%'],
  beneficiario: {
    nome: 'Empresa Fictícia LTDA',
    cnpj: '43576788000191',
    dadosBancarios: {
      carteira: '14',
      agencia: '00101',
      agenciaDigito: '5',
      conta: '12778',
      contaDigito: '0',
      nossoNumero: '222333777777777',
      nossoNumeroDigito: '8',
      nrCedente: '005507',
      nrCedenteDigito: '7',
    },
    endereco: {
      logradouro: 'Rua Pedro Lessa, 15',
      bairro: 'Centro',
      cidade: 'Rio de Janeiro',
      estadoUF: 'RJ',
      cep: '20030-030'
    }
  },
  boleto: {
    numeroDocumento: '1001',
    especieDocumento: 'DM',
    valor: 110.00,
    valorDeducoes: 15.90,
    valorDescontos: 21.00,
    locaisDePagamento: 'PREFERENCIALMENTE NAS CASAS LOTÉRICAS ATÉ O VALOR LIMITE',
    datas: {
      vencimento: '08-10-2020',
      processamento: '02-04-2019',
      documentos: '02-04-2019'
    }
  }
};

const novoBoleto = new Boletos(boleto);
novoBoleto.gerarBoleto();

novoBoleto.pdfFile().then(async ({ stream }) => {
  // ctx.res.set('Content-type', 'application/pdf');	
  await streamToPromise(stream);
}).catch((error) => {
  return error;
});

