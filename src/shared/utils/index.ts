import { Readable } from "stream";

export function bufferToStream(binary) {
	return new Readable({
		read() {
			this.push(binary);
			this.push(null);
		},
	});
}

