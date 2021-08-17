import { Object3D } from '../../../build/three.module.js';

class AudioSequence extends Object3D {

	constructor( listener ) {

		super();

		this.type = 'AudioSequence';

	}

}

export { AudioSequence };
