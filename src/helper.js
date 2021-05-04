import jsPDF from "jspdf";

const A4_PAPER_DIMENSIONS = {
    width: 210, //should be 210
    height: 297,
};

const A4_PAPER_RATIO = A4_PAPER_DIMENSIONS.width / A4_PAPER_DIMENSIONS.height;

export const imageDimensionsOnA4 = (width, height) => {
    const isLandscapeImage = width >= height;

    if (isLandscapeImage) {
        return {
            width: A4_PAPER_DIMENSIONS.width,
            height:
                A4_PAPER_DIMENSIONS.width / (width / height),
        };
    }

    const imageRatio = width / height;
    if (imageRatio > A4_PAPER_RATIO) {
        const imageScaleFactor =
            (A4_PAPER_RATIO * height) / width;

        const scaledImageHeight = A4_PAPER_DIMENSIONS.height * imageScaleFactor;

        return {
            height: scaledImageHeight,
            width: scaledImageHeight * imageRatio,
        };
    }

    return {
        width: A4_PAPER_DIMENSIONS.height / (height / width),
        height: A4_PAPER_DIMENSIONS.height,
    };
};

export const generatePdfFromImages = (selectedImages) => {
    const doc = new jsPDF();
    doc.deletePage(1);

    selectedImages.forEach((image) => {
        const imageDimensions = imageDimensionsOnA4(image.width, image.height);
        console.log(`imageDimensions: `, imageDimensions)
        doc.addPage();
        doc.addImage(
            image.src,
            image.imageType,
            (A4_PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
            (A4_PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
            imageDimensions.width,
            imageDimensions.height
        );
    });

    const pdfURL = doc.output("bloburl");
    window.open(pdfURL, "_blank");
}