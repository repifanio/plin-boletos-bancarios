var dtDif = require('date-fns');
class CodigoBarrasCaixa {
    constructor(){

    }

    calcFatorVencimento(dtVencimento){
        const dataBase = new Date(1997, 9, 7); // Data Base utilizada para fator de vencimento 07/10/1997

        const fatorVencimento = dtDif.differenceInDays(
            dtVencimento,
            dataBase
        );
        return fatorVencimento;
    }

    calcCampoLivre(codBeneficiario, nossoNumero){
        const nossoNumeroArray = [];
        let codBeneficiarioArray = [];
        const constante1 = nossoNumero.substring(0,1);
        const constante2 = nossoNumero.substring(1,2);

        nossoNumeroArray[0] = nossoNumero.substring(2, 5); 
        nossoNumeroArray[1] = nossoNumero.substring(5, 8); 
        nossoNumeroArray[2] = nossoNumero.substring(8, 17); 

        codBeneficiarioArray = codBeneficiario.split('-'); 

        return `${codBeneficiarioArray[0]}${codBeneficiarioArray[1]}${nossoNumeroArray[0]}${constante1}${nossoNumeroArray[1]}${constante2}${nossoNumeroArray[2]}`;
    }

    calcMod11DvCampoLivre(value, dvGeral = false){

        //console.log(value);

        let i = 0;
        let fatorMulti = 2;
        let totalSoma = 0;
        for (i = value.length; i > 0; i--) {
        if (fatorMulti === 10) {
            fatorMulti = 2;
        }
        totalSoma += value.substring(i, i - 1) * fatorMulti;
        fatorMulti += 1;
        }
        const resto = totalSoma % 11;

        if (dvGeral){
            if (11 - resto > 9) {
                return 1;
            }
        } else {
            if (11 - resto > 9) {
                return 0;
            }
        }
        
        return 11 - resto;
    }
}

module.exports = CodigoBarrasCaixa;