import { Object3D } from '../../../build/three.module.js';

class AudioPlayer extends Object3D {

	constructor( generator ) {

		super();

		this.type = 'AudioPlayer';

		this.generator = generator;
		this.context = this.generator.context;

	}

}

export { AudioPlayer };
