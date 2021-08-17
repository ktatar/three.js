import { Object3D } from '../../../build/three.module.js';

class AudioSequence extends Object3D {

	constructor() {

		super();

		this.type = 'AudioSequence';

	}

	duplicates( length , value ) {

		this.length = length;
		this.value = value;

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = this.value;
		}

		return this.sequence;

	}

	pad( padLength , value ) {

		this.padLength = padLength;
		this.value = value;

		for(var i=0; i<this.padLength; i++) {
			this.sequence.push(this.value);
		}

		return this.sequence;

	}

	loop( length , valuesArray ) {

		this.length = length;
		this.valuesArray = valuesArray;

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = this.valuesArray[i%this.valuesArray.length];
		}

		return this.sequence;

	}

	additive( length , valuesArray ) {

		this.length = length;
		this.valuesArray = valuesArray;

		this.v = 0;

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = this.v;
			this.v += this.valuesArray[randomInt(0, this.valuesArray.length)];
		}

		return this.sequence;

	}

	sumSequence() {

		for(var i=1; i<this.sequence.length; i++) {
			this.sequence[i] += this.sequence[i-1];
		}

		return this.sequence;

	}

	multiples( length , base , multiplesArray ) {

		this.length = length;
		this.base = base;
		this.multiplesArray = multiplesArray;

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = this.base*this.multiplesArray[i];
		}

		return this.sequence;

	}

	powers( length , base , expArray ) {

		this.length = length;
		this.base = base;
		this.expArray = expArray

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = Math.pow(this.base, this.expArray[i]);
		}

		return this.sequence;

	}

	randomPowers( length , base , powArray ) {

		this.length = length;
		this.base = base;
		this.powArray = powArray;

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = Math.pow(this.base, randomArrayValue(this.powArray));
		}

		return this.sequence;

	}

	urnPowers( length , base , powArray ) {

		this.length = length;
		this.base = base;
		this.powArray = powArray;

		for(var i=0; i<this.length; i++) {
			if(i%this.powArray.length == 0) {shuffle(this.powArray)};
			this.sequence[i] = Math.pow(this.base, this.powArray[i%this.powArray.length]);
		}

		return this.sequence;

	}

	randomMultiples( length , base , multArray ) {

		this.length = length;
		this.base = base;
		this.multArray = multArray;

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = this.base*randomArrayValue(this.multArray);
		}

		return this.sequence;

	}

	urnMultiples( length , base , multArray ) {

		this.length = length;
		this.base = base;
		this.multArray = multArray;

		for(var i=0; i<this.length; i++) {
			if(i%this.multArray.length == 0) {shuffle(this.multArray)};
			this.sequence[i] = this.base*this.multArray[i%this.multArray.length];
		}

		return this.sequence;

	}

	evenDiv( div ) {

		this.div = div;

		for(var i=0; i<this.div; i++) {
			this.sequence[i] = (i+1)/this.div;
		}

		return this.sequence;

	}

	randomSelect( length , valuesArray ) {

		this.length = length;
		this.valuesArray = valuesArray;

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = this.valuesArray[randomInt(0, this.valuesArray.length)];
		}

		return this.sequence;

	}

	urnSelect( length , valuesArray ) {

		this.length = length;
		this.valuesArray = valuesArray;

		for(var i=0; i<this.length; i++) {
			if(i%this.valuesArray.length == 0) {shuffle(this.valuesArray)};
			this.sequence[i] = this.valuesArray[i%this.valuesArray.length];
		}

		return this.sequence;

	}

	randomFloats( length , min , max ) {

		this.length = length;
		this.min = min;
		this.max = max;

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = randomFloat(this.min, this.max);
		}

		return this.sequence;

	}

	randomInts( length , min , max ) {

		this.length = length;
		this.min = min;
		this.max = max;

		for(var i=0; i<this.length; i++) {
			this.sequence[i] = randomInt(this.min, this.max);
		}

		return this.sequence;

	}

	add( value ) {

		this.value = value;

		for(var i=0; i<this.sequence.length; i++) {
			this.sequence[i] += this.value;
		}

		return this.sequence;

	}

	subtract( value ) {

		this.value = value;

		for(var i=0; i<this.sequence.length; i++) {
			this.sequence[i] -= this.value;
		}

		return this.sequence;

	}

	multiply( value ) {

		this.value = value;

		for(var i=0; i<this.sequence.length; i++) {
			this.sequence[i] *= this.value;
		}

		return this.sequence;

	}

	divide( value ) {

		this.value = value;

		for(var i=0; i<this.sequence.length; i++) {
			this.sequence[i] /= this.value;
		}

		return this.sequence;

	}

	lace( newSequence ) {

		this.newSequence = newSequence;
		this.oldSequence = this.sequence;
		this.sequence = [];

		for(var i=0; i<this.newSequence.length; i++) {
			this.sequence[i*2] = this.oldSequence[i];
			this.sequence[(i*2)+1] = this.newSequence[i];
		}

		return this.sequence;

	}

	laceAdd( newSequence ) {

		this.newSequence = newSequence;
		this.oldSequence = this.sequence;
		this.sequence = [];

		for(var i=0; i<this.newSequence.length; i++) {
			this.sequence[i*2] = this.oldSequence[i];
			this.sequence[(i*2)+1] = this.newSequence[i];
		}

		for(var i=0; i<this.sequence.length; i++) {
			if(i!=0) {
				this.sequence[i] = this.sequence[i]+this.sequence[i-1];
			}
			else if(i==0) {
				this.sequence[i] = this.sequence[i];
			}
		}

		return this.sequence;

	}

	palindrome() {

		this.l = this.sequence.length-1;

		for(var i=0; i<this.l; i++) {
			this.sequence.push(this.sequence[this.l-1-i]);
		}

		return this.sequence;

	}

	bipolar() {

		this.l = this.sequence.length;

		for(var i=0; i<this.l; i++) {
			if(i==0) {
				if(this.sequence[i]==-0) {}
				else if(this.sequence[i]!=-0) {this.sequence.push(-this.sequence[i])}
			}
			else if(i==this.l-1) {
				if(this.sequence[this.l-1]==-0) {}
				else if(this.sequence[this.l-1]!=-0) {this.sequence.push(-this.sequence[i])}
			}
			else if(i!=0 && i!=this.l) {
				this.sequence.push(-this.sequence[i]);
			}
		}
			return this.sequence;

	}

	join( array ) {

		this.array = array;

		for(var i=0; i<this.array.length; i++) {
			this.sequence.push(this.array[i]);
		}

		return this.sequence;

	}

	replace( idx , value ) {

		this.idx = idx;
		this.value = value;

		this.sequence[this.idx] = this.value;

	}

	insert( idx , value ) {

		this.idx = idx;
		this.value = value;

		this.sequence.splice(this.idx, 0, this.value);

	}

	ramp( length , upEnd , downStart , upExp , downExp ) {

		this.length = length;
		this.upEnd = upEnd;
		this.downStart = downStart;
		this.upExp = upExp;
		this.downExp = downExp;

		this.uP = parseInt(this.length*this.upEnd);
		this.dP = parseInt(this.length*this.downStart);

		this.uL = this.uP;
		this.dL = this.length-this.dP;

		for(var i=0; i<this.length; i++) {

			if(i<=this.uP) {
				this.sequence[i] = Math.pow(i/this.uL, this.upExp);
			}

			else if(i>this.uP && i<this.dP) {
				this.sequence[i] = 1;
			}

			else if(i>=this.dP) {
				this.sequence[i] = Math.pow((this.dL-(i-this.dP))/this.dL, this.downExp);
			}

		}

	}

	segments( length , segmentPointsArray , segmentValuesArray ) {

		this.length = length;
		this.segmentPointsArray = segmentPointsArray;
		this.segmentValuesArray = segmentValuesArray;
		this.offset = 0;

		for(var i=0; i<=this.segmentPointsArray.length; i++) {

			if(i>0) {
				console.log(this.offset);
				this.offset = parseInt(this.segmentPointsArray[i-1]*this.length);
			}

			for(var j=this.offset; j<parseInt(this.segmentPointsArray[i]*this.length); j++) {

				this.sequence[j] = this.segmentValuesArray[i];

			}

			if(i==this.segmentPointsArray.length) {

				for(var j=this.offset; j<this.length; j++) {

					this.sequence[j] = this.segmentValuesArray[i];

				}

			}

		}

	}

	multiplySequence( newSequence ) {

		this.newSequence = newSequence;

		for(var i=0; i<this.sequence.length; i++) {
				this.sequence[i] *= this.newSequence[i];
		}

	}

	divideSequence( newSequence ) {

		this.newSequence = newSequence;

		for(var i=0; i<this.sequence.length; i++) {
				this.sequence[i] /= this.newSequence[i];
		}

	}

	addSequence( newSequence ) {

		this.newSequence = newSequence;

		for(var i=0; i<this.sequence.length; i++) {
				this.sequence[i] += this.newSequence[i];
		}

	}

	subtractSequence( newSequence ) {

		this.newSequence = newSequence;

		for(var i=0; i<this.sequence.length; i++) {
				this.sequence[i] -= this.newSequence[i];
		}

	}

}

export { AudioSequence };
