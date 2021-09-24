import { Object3D } from '../../../build/three.module.js';

class AudioNodePlayer extends Object3D {

	constructor( node ) {

		super();

		this.type = 'AudioNodePlayer';

		this.node = node;
		this.context = this.node.context;

	}

}

export { AudioNodePlayer };
