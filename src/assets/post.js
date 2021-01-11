export default class Post {
    constructor(title, img) {
        this.title = title;
        this.img = img;
        this.data = new Date();
    }
    toString() {
        return JSON.stringify({
            title: this.title,
            data: this.data.toJSON(),
            img: this.img   
        })
    }
    get upperCaseTitle() {
        return this.title.toUpperCase();
    }
}