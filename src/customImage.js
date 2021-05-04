export class CustomImage extends Image {
    constructor(mimeType) {
        super();
        this.mimeType = mimeType;
    }

    get imageType() {
        return this.mimeType.split("/")[1];
    }
}