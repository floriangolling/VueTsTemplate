export default interface Iidea {
    createdAt: string | Date;
    updatedAt: Date;
    title: string;
    text: string;
    user: string;
    like: number;
    id: number;
}