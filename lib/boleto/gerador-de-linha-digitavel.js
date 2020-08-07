const formatarLinhaDigitavel = require('../utils/functions/formatacoesUtils').linhaDigitavel;
const ValidaCodigoBarras = require('./valida-codigo-barras');
const GeradorDeDigitoPadrao = require('./gerador-de-digito-padrao');

module.exports = function(codigoDeBarras, banco, numerBanco = null) {
	ValidaCodigoBarras.validar(codigoDeBarras);
	const linhaDigitavel = [];

	if (numerBanco === '104-0'){
		
		let bloco1 = null;
		let bloco2 = null;
		let bloco3 = null;
		let bloco4 = null;

		// Bloco 1
		linhaDigitavel.push(codigoDeBarras.substring(0, 3));
		linhaDigitavel.push(codigoDeBarras.substring(3, 4));
		linhaDigitavel.push(codigoDeBarras.substring(19, 24));
		bloco1 = linhaDigitavel.join('');
		linhaDigitavel.push(GeradorDeDigitoPadrao.mod10(bloco1));

		// Bloco 2
		linhaDigitavel.push(codigoDeBarras.substring(24, 34));
		bloco2 = codigoDeBarras.substring(24, 34);
		linhaDigitavel.push(GeradorDeDigitoPadrao.mod10(bloco2));

		// Bloco 3
		linhaDigitavel.push(codigoDeBarras.substring(34));
		bloco3 = codigoDeBarras.substring(34);
		linhaDigitavel.push(GeradorDeDigitoPadrao.mod10(bloco3));

		// Bloco 4
		bloco4 = codigoDeBarras.substring(4, 5);
		linhaDigitavel.push(bloco4);

		// Bloco 5
		linhaDigitavel.push(codigoDeBarras.substring(5, 9));
		linhaDigitavel.push(codigoDeBarras.substring(9, 19));
	}	

	// const linhaDigitavel = [];

	// linhaDigitavel.push(codigoDeBarras.substring(0, 3));
	// linhaDigitavel.push(codigoDeBarras.substring(3, 4));
	// linhaDigitavel.push(codigoDeBarras.substring(19, 24));
	// linhaDigitavel.push(GeradorDeDigitoPadrao.mod10(linhaDigitavel.join('')));

	// linhaDigitavel.push(codigoDeBarras.substring(24, 34));
	// linhaDigitavel.push(GeradorDeDigitoPadrao.mod10(linhaDigitavel.join('').substring(10, 20)));

	// linhaDigitavel.push(codigoDeBarras.substring(34));
	// linhaDigitavel.push(GeradorDeDigitoPadrao.mod10(linhaDigitavel.join('').substring(21, 31)));

	// linhaDigitavel.push(codigoDeBarras.substring(4, 5));
	// linhaDigitavel.push(codigoDeBarras.substring(5, 9));
	// linhaDigitavel.push(codigoDeBarras.substring(9, 19));

	return formatarLinhaDigitavel(linhaDigitavel.join(''));
};
