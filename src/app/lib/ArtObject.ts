export class ArtObject {
    objectNumber: string;
    imageUrl: string;
    title?: string;
    description?: string;
    principalMaker?: string;
    
    constructor(objectNumber: string, imageUrl: string, title?: string, description?: string, principalMaker?: string) {
        this.objectNumber = objectNumber;
        this.imageUrl = imageUrl;
        this.title = title;
        this.description = description;
        this.principalMaker = principalMaker;
    }
  }
  