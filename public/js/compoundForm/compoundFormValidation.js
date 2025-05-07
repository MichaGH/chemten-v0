document.addEventListener("DOMContentLoaded", () => {
    //! ----- Get DOM elements
    // CAS input
    const casInput = document.getElementById("cas");
    const casError = document.getElementById("cas-error");

    // Formula input
    const formulaInput = document.getElementById("formula");
    const formulaError = document.getElementById("formula-error");

    // Molar - Weight value and button
    const calcButton = document.getElementById("calc-weight-btn");
    const weightOutput = document.getElementById("molecular-weight");

    //! ----- DOM MANIPULATION
    //! CAS validation on blur
    casInput.addEventListener("blur", () => {
        const value = casInput.value.trim();
        if (!isValidCAS(value)) {
            casInput.classList.add("border-red-500");
            casInput.classList.remove("border-green-500");
            casError.classList.remove("hidden");
        } else {
            casInput.classList.remove("border-red-500");
            casInput.classList.add("border-green-500");
            casError.classList.add("hidden");
    }
    })

    //! Validate formula!
    let isFormulaValid;
    formulaInput.addEventListener("blur", () => {
        const formula = formulaInput.value.trim();
        isFormulaValid = isValidFormula(formula)
        if (!isFormulaValid) {
            formulaInput.classList.add("border-red-500");
            formulaInput.classList.remove("border-green-500");
            formulaError.classList.remove("hidden");
            weightOutput.value = "";
        } else {
            formulaInput.classList.remove("border-red-500");
            formulaInput.classList.add("border-green-500");
            formulaError.classList.add("hidden");
        }
        console.log(isFormulaValid);
    })

    //! Molecular weight calculation on button click
    calcButton.addEventListener("click", () => {
        if (isFormulaValid) {
            const formula = formulaInput.value.trim();
            weightOutput.value = "";
            const weight = calculateMolecularWeight(formula);
            weightOutput.value = isNaN(weight) ? "" : weight.toFixed(3);
        } else {
            weightOutput.value = "invalid formula!"
        }
      });
    });
    
    //! ----- VALIDATIONS & CACLULATIONS
    //! CAS validator
    function isValidCAS(cas) {
        //? Check if within 0000000-00-0 format ([2-7 digis]-[2 digits]-[1 digit])
        if ( !/^\d{2,7}-\d{2}-\d$/.test(cas) ) {
            return false;
        }

        //? Check if the last (validation) number is correct
        /*
        CAS of water : 7732-18-5
        5 - checksum is calculated as :
            (8)*1 + (1)*2 + (2)*3 + (3)*4 + (7)*5 + (7)*6 = 105
            105 mod 10 = 5 
        */
        const casParts = cas.split("-");
        const digits = (casParts[0] + casParts[1]).split("").reverse()
        const checkSum = parseInt(casParts[2])
        
        const sum = digits.reduce((acc, digit, index) => {
            return acc + parseInt(digit) * (index + 1);
        }, 0);

        return sum % 10 === checkSum;
    }


    //! Validate formula
    function isValidFormula(formula) {
        if (!formula){
            return false;
        } 

        // correct format of groups - 1-2 letter + numbers (e.g. C10H12O6)
        const formulaRegex = /^[A-Z][a-z]?\d*(?:[A-Z][a-z]?\d*)*$/;
        console.log("formulaRegex.test(formula)");
        console.log(formulaRegex.test(formula));
        return formulaRegex.test(formula);
    }


    //! Calculate molecular weight
    function calculateMolecularWeight(formula) {
        const atomicWeights = {
            H: 1.008, C: 12.011, N: 14.007, O: 15.999, S: 32.06, P: 30.974,
            F: 18.998, Cl: 35.45, Br: 79.904, I: 126.904, Si: 28.085,
            B: 10.81, Na: 22.990, K: 39.098, Mg: 24.305, Ca: 40.078,
            Zn: 65.38, Fe: 55.845
          };

        let weight = 0;
        const regex = /([A-Z][a-z]?)(\d*)/g;
        let match;

        //  run .exec, assign it to match, check if there is something, if yes, run the looop
        //  formula = C10 
        //  match = regex.exec(formula)
        //      match[0] → "C10"
        //      match[1] → "C"
        //      match[2] → "10"
        //  calculate the weight
        //  end of cycle, check conditions again → next() in .exec, ... etc, until == null

        while ((match = regex.exec(formula)) !== null){
            const element = match[1];
            const count = parseInt(match[2], 10) || 1;
            const atomicWeight = atomicWeights[element];
            if (!atomicWeight) return NaN;
            weight += atomicWeight * count
        }
        
        return weight;
    }

