export { IWritable };

interface IWritable {
    create(entity: any): any;
    update(id:number, entity: any): any;
    delete(id: number): any;
    deleteAll(): any;
}