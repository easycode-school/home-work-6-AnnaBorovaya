export interface Post { // далее импортим его в наш сервис
    userId: number | string;
    title: string;
    body: string;
    id?: number;
}
