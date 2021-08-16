import { Object3D } from '../../../build/three.module.js';

class AudioSequencer extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioSequencer';

	}

	playSequence( instrument , timeValueArray ){

		for( let i = 0 ; i < timeValueArray.length ; i++ ){

			instrument.start(  )

		}

	}

}

export { AudioSequencer };
