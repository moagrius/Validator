var Validator = (function(){
	
	return {
		
		/* constants */
		
		// bitmasks
		FALSY_FALSE : 1,
		FALSY_NULL : 2,
		FALSY_UNDEFINED : 4,
		FALSY_ZERO : 8,
		FALSY_EMPTYSTRING : 16,
		FALSY_ALL : 31,
	
		/* boolean validation */
		equals : function(a, b){
			return a == b;
		},
		identity : function(a, b){
			return a === b;
		},
				
		isTruthy : function(value, flags){
			if(typeof flags == 'undefined'){
				return !!(value);
			}
			var truthiness = true;
			if(flags & this.FALSY_FALSE){
				truthiness = truthiness && (value !== false);
			}
			if(flags & this.FALSY_NULL){
				truthiness = Validator.truthiness && (value !== null);
			}
			if(flags & this.FALSY_UNDEFINED){
				truthiness = truthiness && (value !== undefined);
			}
			if(flags & this.FALSY_ZERO){
				truthiness = truthiness && (value !== 0);
			}
			if(flags & this.FALSY_EMPTYSTRING){
				truthiness = truthiness && (value !== '');
			}
			return truthiness;
		},
		isFalsy : function(value, flags){
			return !(this.isTruthy(value, flags));
		},
	
		/* date validation */
		isDate : function(string, preutc){
			var date = Date.parse(string);
			if(isFinite(date)){
				return true;
			}
			// some browsers don't like dashes, try that too
			var slashes = string.replace(/-/g, '/');
			date = Date.parse(slashes);
			if(isFinite(date)){
				return true;
			}
			// if made it this far and date might be before 1970, try using the current year
			if(preutc){
				var now = new Date();
				string = string.replace(/\d{4}/, now.getFullYear());
				date = Date.parse(string);
				return isFinite(date);
			}
			return false;
		},
		
		/* string validation */
		isEmptyString : function(string, countWhitespace){
			if(!countWhitespace){
				string = string.replace(/\s+/g, '');
			}
			return string.length == 0;
		},
		isEmail : function(string){
			return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(string);
		},
		isURL : function(string){
			return /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/i.test(string);
		},
		isZip : function(string, plus4){
			var pattern = plus4 ? /^\d{5}-\d{4}$/ : /^\d{5}$/;
			return pattern.test(string);
		},
		isPhone : function(string){
			return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(string);
		},
		isCreditCard : function(string){
			var valid = /^[\d-\s]$/.test(string);
			if(!valid){
				return false;
			}
			return this.luhn(string);
		},
		luhn : function(string){
			var numeric = string.replace(/\d+/g, '');
			var digits = numeric.split('');
			var count = digits.length;
			var parity = count % 2;
			var total = 0;
			for(var i = 0; i < count; i++){
				var digit = digits[i];      
				if ((i % 2) == parity) {
					digit *= 2;
					if(digit > 9) {
						digit -= 9;
					}
				}
				total += digit;     
			}
			return (total % 10) == 0;
		},
		isInteger : function(string){
			return /^\-?\d+$/.test(string);
		},
		isNumeric : function(string){
			return /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(string);
		},
		isCurrency : function(string, us){
			return /^\$-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(string);
		},
		isIP : function(string){
			return /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/.test(string);
		},
		isSSN : function(string){
			return /^\d{3}-\d{2}-\d{4}$/.test(string);
		},
		isTIN : function(string){
			return /^\d{2}-\d{7}$/.test(string);
		},
		isBase64 : function(string){
			return /[^a-zA-Z0-9\/\+=]/i.test(string);
		},
		isAlpha : function(string){
			return /^[a-z]$/i.test(string);
		},
		isAlphaNumeric : function(string){
			return /^[a-z0-9]$/i.test(string);
		},
		isLowerCase : function(string){
			return string.toLowerCase() == string;
		},
		isUpperCase : function(string){
			return string.toUpperCase() == string;
		},
		isMixedCase : function(string){
			return /[a-z]/.test(string) && /[A-Z]/.test(string);
		},
		isMixedAlphaNumeric : function(string){
			return /[a-z]/i.test(string) && /\d/.test(string);
		},
		isMixedCaseAndAlphaNumeric : function(string){
			/[a-z]/.test(string) && /[A-Z]/.test(string) && /\d/.test(string);
		},
		lengthIsBetween : function(string, min, max){
			return string.length >= min && string.length <= max;
		}
		
	};
	
})();