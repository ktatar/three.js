import { Object3D } from '../../../build/three.module.js';

class AudioSequencer extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioSequencer';
		this.sequence = [];

	}

	addSequence( idx , array ){

		this.sequence[idx] = array;

	}

	outputSequence(){

		const subLength = this.sequence[0].length;
		let outputSequence = [];

		for( let i = 0 ; i < subLength ; i++ ){

			for( let j = 0 ; j < this.sequence.length ; j++ ){

				outputSequence[j] = this.sequence[j][i];

			}

			console.log( outputSequence );

		}

	}

	collateSequence(){

		const subLength = this.sequence[0].length;
		let tempSequence = [];

		for( let i = 0 ; i < subLength ; i++ ){

			tempSequence[i] = [];

			for( let j = 0 ; j < this.sequence.length ; j++ ){

				tempSequence[i][j] = this.sequence[j][i];

			}

		}

		this.sequence = tempSequence;

	}

	playSequence( instrument , timeValueArray ){

		for( let i = 0 ; i < timeValueArray.length ; i++ ){

			instrument.start(  )

		}

	}

}

export { AudioSequencer };
