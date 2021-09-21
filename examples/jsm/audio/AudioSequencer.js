import { Object3D } from '../../../build/three.module.js';

class AudioSequencer extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioSequencer';
		this.masterSequence = [];
		this.length = 0;

	}

	addSequence( idx , array ){

		this.sequence[idx] = array;

	}

	assembleSequence( sequenceArray ){

		const subLength = sequenceArray[0].length;

		this.length = subLength > this.length ? subLength : this.length;

		let tempSequence = [];

		for( let i = 0 ; i < subLength ; i ++ ){

			tempSequence[i] = [];

			for( let j = 0 ; j < sequenceArray.length ; j++ ){

				tempSequence[i][j] = sequenceArray[j][i];

			}

		}

		this.masterSequence.push( tempSequence );

	}

}

export { AudioSequencer };
