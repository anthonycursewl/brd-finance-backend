export class Category {
    constructor(
        public id: string,
        public name: string,
        public description: string,
        public icon: string,
        public user_id: string,
        public is_deleted: boolean,
        public created_at: Date) { }
}