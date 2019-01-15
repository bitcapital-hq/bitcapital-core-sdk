"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const __1 = require("..");
const class_validator_1 = require("class-validator");
class Consumer extends __1.BaseModel {
    constructor(data) {
        super(data);
        this.user = undefined;
        this.taxId = undefined;
        this.addresses = undefined;
        this.documents = undefined;
        this.phones = undefined;
        Object.assign(this, data);
        this.addresses = data.addresses && data.addresses.map(address => new _1.Address(address));
        this.documents = data.documents && data.documents.map(document => new _1.Document(document));
        this.phones = data.phones && data.phones.map(phone => new _1.Phone(phone));
        this.states = data.states && data.states.map(state => new _1.ConsumerState(state));
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], Consumer.prototype, "taxId", void 0);
exports.Consumer = Consumer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uc3VtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWIvbW9kZWxzL0NvbnN1bWVyL0NvbnN1bWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsd0JBU1c7QUFDWCwwQkFBa0U7QUFDbEUscURBQTZDO0FBVzdDLGNBQXNCLFNBQVEsYUFBUztJQVVyQyxZQUFZLElBQTZCO1FBQ3ZDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQVZkLFNBQUksR0FBVSxTQUFTLENBQUM7UUFFVixVQUFLLEdBQVcsU0FBUyxDQUFDO1FBRXhDLGNBQVMsR0FBYyxTQUFTLENBQUM7UUFDakMsY0FBUyxHQUFnQixTQUFTLENBQUM7UUFDbkMsV0FBTSxHQUFZLFNBQVMsQ0FBQztRQU0xQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFVBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLElBQUksV0FBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxRQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGdCQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0NBQ0Y7QUFqQmU7SUFBYiw0QkFBVSxFQUFFOzt1Q0FBMkI7QUFIMUMsNEJBb0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWRkcmVzcyxcbiAgQWRkcmVzc1NjaGVtYSxcbiAgRG9jdW1lbnQsXG4gIERvY3VtZW50U2NoZW1hLFxuICBQaG9uZSxcbiAgUGhvbmVTY2hlbWEsXG4gIENvbnN1bWVyU3RhdGUsXG4gIENvbnN1bWVyU3RhdGVTY2hlbWFcbn0gZnJvbSBcIi5cIjtcbmltcG9ydCB7IEJhc2VNb2RlbCwgQmFzZU1vZGVsU2NoZW1hLCBVc2VyLCBVc2VyU2NoZW1hIH0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBJc05vdEVtcHR5IH0gZnJvbSBcImNsYXNzLXZhbGlkYXRvclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbnN1bWVyU2NoZW1hIGV4dGVuZHMgQmFzZU1vZGVsU2NoZW1hIHtcbiAgdXNlcj86IFVzZXJTY2hlbWE7XG4gIGRvY3VtZW50cz86IERvY3VtZW50U2NoZW1hW107XG4gIHBob25lcz86IFBob25lU2NoZW1hW107XG4gIGFkZHJlc3Nlcz86IEFkZHJlc3NTY2hlbWFbXTtcbiAgdGF4SWQ6IHN0cmluZztcbiAgc3RhdGVzPzogQ29uc3VtZXJTdGF0ZVNjaGVtYVtdO1xufVxuXG5leHBvcnQgY2xhc3MgQ29uc3VtZXIgZXh0ZW5kcyBCYXNlTW9kZWwgaW1wbGVtZW50cyBDb25zdW1lclNjaGVtYSB7XG4gIHVzZXI/OiBVc2VyID0gdW5kZWZpbmVkO1xuXG4gIEBJc05vdEVtcHR5KCkgdGF4SWQ6IHN0cmluZyA9IHVuZGVmaW5lZDtcblxuICBhZGRyZXNzZXM6IEFkZHJlc3NbXSA9IHVuZGVmaW5lZDtcbiAgZG9jdW1lbnRzPzogRG9jdW1lbnRbXSA9IHVuZGVmaW5lZDtcbiAgcGhvbmVzOiBQaG9uZVtdID0gdW5kZWZpbmVkO1xuICBzdGF0ZXM/OiBDb25zdW1lclN0YXRlW107XG5cbiAgY29uc3RydWN0b3IoZGF0YTogUGFydGlhbDxDb25zdW1lclNjaGVtYT4pIHtcbiAgICBzdXBlcihkYXRhKTtcblxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgZGF0YSk7XG5cbiAgICB0aGlzLmFkZHJlc3NlcyA9IGRhdGEuYWRkcmVzc2VzICYmIGRhdGEuYWRkcmVzc2VzLm1hcChhZGRyZXNzID0+IG5ldyBBZGRyZXNzKGFkZHJlc3MpKTtcbiAgICB0aGlzLmRvY3VtZW50cyA9IGRhdGEuZG9jdW1lbnRzICYmIGRhdGEuZG9jdW1lbnRzLm1hcChkb2N1bWVudCA9PiBuZXcgRG9jdW1lbnQoZG9jdW1lbnQpKTtcbiAgICB0aGlzLnBob25lcyA9IGRhdGEucGhvbmVzICYmIGRhdGEucGhvbmVzLm1hcChwaG9uZSA9PiBuZXcgUGhvbmUocGhvbmUpKTtcbiAgICB0aGlzLnN0YXRlcyA9IGRhdGEuc3RhdGVzICYmIGRhdGEuc3RhdGVzLm1hcChzdGF0ZSA9PiBuZXcgQ29uc3VtZXJTdGF0ZShzdGF0ZSkpO1xuICB9XG59XG4iXX0=